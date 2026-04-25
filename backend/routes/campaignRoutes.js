const express = require("express");
const {
    createCampaign,
    getCampaigns,
    getCampaignById,
    deleteCampaign,
    uploadCSVPreview,
    confirmCSVUpload,
    getCampaignLeads,
    getLeadById,
    startGeneration
} = require("../controllers/campaignController");
const auth = require("../middleware/auth");
const upload = require("../utils/multerConfig");

const router = express.Router();

// All campaign routes are protected
router.use(auth);

router.post("/", createCampaign);
router.get("/", getCampaigns);
router.get("/:id", getCampaignById);
router.delete("/:id", deleteCampaign);

// CSV Upload Preview & Confirm
router.post("/:id/upload-preview", upload.single("csvFile"), uploadCSVPreview);
router.post("/:id/confirm-upload", upload.single("csvFile"), confirmCSVUpload);

// Lead management
router.get("/:id/leads", getCampaignLeads);
router.get("/:id/leads/:leadId", getLeadById);

// Generation
router.post("/:id/generate", startGeneration);

module.exports = router;
