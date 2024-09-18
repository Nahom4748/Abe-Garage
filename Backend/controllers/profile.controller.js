// const profileService = require("../services/profile.service"); // Import the profile service

// // Function to fetch profile information
// // async function getProfile(req, res) {
// //   const { customerId } = req.params;

// //   try {
// //     // Fetch profile data using the profile service
// //     const profile = await profileService.getProfileById(customerId);
// //     if (!profile) {
// //       return res.status(404).json({ message: "Profile not found" });
// //     }
// //     res.status(200).json(profile);
// //   } catch (error) {
// //     console.error("Error fetching profile:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // }

// // Export the function
// // module.exports = {
// //   getProfile,
// // };

// async function getProfileById(req, res) {
//   const { id } = req.params;

//   try {
//     const profile = await profileService.getProfileById(id);
//     if (!profile) {
//       return res.status(404).json({ error: "Profile not found" });
//     }
//     res.status(200).json(profile);
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// module.exports = {
//   getProfileById,
// };
