/**
 * Validates email format
 */
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

/**
 * Maps CSV data to Lead model fields and validates
 * @param {Array} rawData - Array of objects from Papa Parse
 * @param {Object} mapping - Object mapping CSV headers to DB fields { "Email": "email" }
 * @param {String} campaignId - ID of the campaign
 */
const processLeads = (rawData, mapping, campaignId) => {
    const leads = [];
    const errors = [];
    const seenInCSV = new Set();

    rawData.forEach((row, index) => {
        const lead = { 
            campaignId,
            status: 'active'
        };
        
        let hasEmail = false;

        // Apply mapping
        Object.keys(mapping).forEach((csvHeader) => {
            const dbField = mapping[csvHeader];
            if (row[csvHeader] !== undefined && row[csvHeader] !== null) {
                let value = String(row[csvHeader]).trim();
                
                if (dbField === 'email') {
                    value = value.toLowerCase();
                    if (validateEmail(value)) {
                        hasEmail = true;
                    }
                }
                
                lead[dbField] = value;
            }
        });

        // Validation logic
        if (!hasEmail) {
            errors.push({ row: index + 1, message: "Invalid or missing email" });
            return;
        }

        // Deduplicate within the CSV itself
        if (seenInCSV.has(lead.email)) {
            errors.push({ row: index + 1, message: `Duplicate email in CSV: ${lead.email}` });
            return;
        }

        seenInCSV.add(lead.email);
        leads.push(lead);
    });

    return { leads, errors };
};

module.exports = { processLeads };
