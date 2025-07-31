const cron = require('node-cron');
const User = require('../models/User');
const Document = require('../models/Document');
const sendEmail = require('../utils/Mailer');

const runEmailReminderJob = () => {
  // Runs every day at 9 AM
  (async () => {
  cron.schedule('0 9 * * *', async () => {
    console.log('🔔 Running document expiry reminder job...');
    // cron.schedule('*/1 * * * *', async () => {
    // console.log('🔔 Running document expiry reminder job...');
    const users = await User.find();
    const today = new Date();
    const notifyWithinDays = 7;

    for (const user of users) {
      const documents = await Document.find({ userId: user._id });

      const expiringDocs = documents.filter(doc => {
        const expiryDate = new Date(doc.expiryDate);
        const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        return diffDays <= notifyWithinDays && diffDays >= 0;
      });

      if (expiringDocs.length > 0) {
        const docList = expiringDocs
          .map(doc => `• ${doc.title} (expires in ${Math.ceil((new Date(doc.expiryDate) - today) / (1000 * 60 * 60 * 24))} days)`)
          .join('\n');

        const message = `Hello ${user.name},\n\nThe following documents are about to expire soon:\n\n${docList}\n\nPlease update them on the platform.\n\nRegards,\nDocExpiry Reminder App`;

        await sendEmail(user.email, 'Document Expiry Reminder', message);
        console.log(`📧 Sent reminder to ${user.email}`);
      }
    }
  });
  })();
};


module.exports = runEmailReminderJob;
