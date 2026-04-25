const { processLeads } = require("../utils/leadService");

describe("Lead Processing Utility", () => {
    const mapping = {
        "Full Name": "name",
        "Email": "email",
        "Phone Number": "phone"
    };
    const campaignId = "60d5ecb8b3928400158c3a12";

    test("should correctly map and clean lead data", () => {
        const rawData = [
            { "Full Name": "John Doe", "Email": "JOHN@example.com ", "Phone Number": "12345" }
        ];
        const { leads, errors } = processLeads(rawData, mapping, campaignId);
        
        expect(leads).toHaveLength(1);
        expect(leads[0].name).toBe("John Doe");
        expect(leads[0].email).toBe("john@example.com");
        expect(leads[0].phone).toBe("12345");
        expect(errors).toHaveLength(0);
    });

    test("should skip leads with invalid emails", () => {
        const rawData = [
            { "Full Name": "Bad Email", "Email": "not-an-email", "Phone Number": "000" }
        ];
        const { leads, errors } = processLeads(rawData, mapping, campaignId);
        
        expect(leads).toHaveLength(0);
        expect(errors).toHaveLength(1);
        expect(errors[0].message).toContain("Invalid or missing email");
    });

    test("should deduplicate emails within the same CSV", () => {
        const rawData = [
            { "Full Name": "User 1", "Email": "dup@example.com", "Phone Number": "1" },
            { "Full Name": "User 2", "Email": "dup@example.com", "Phone Number": "2" }
        ];
        const { leads, errors } = processLeads(rawData, mapping, campaignId);
        
        expect(leads).toHaveLength(1);
        expect(errors).toHaveLength(1);
        expect(errors[0].message).toContain("Duplicate email in CSV");
    });

    test("should handle missing optional fields gracefully", () => {
        const rawData = [
            { "Email": "only-email@example.com" }
        ];
        const { leads, errors } = processLeads(rawData, mapping, campaignId);
        
        expect(leads).toHaveLength(1);
        expect(leads[0].email).toBe("only-email@example.com");
        expect(leads[0].name).toBeUndefined();
        expect(errors).toHaveLength(0);
    });
});
