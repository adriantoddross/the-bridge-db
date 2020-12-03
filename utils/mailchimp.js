const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

mailchimp.setConfig({
  apiKey: `${process.env.MAILCHIMP_API_KEY}`,
  server: `${process.env.MAILCHIMP_SERVER_PREFIX}`,
});

const mailchimpAPI = {
  ping: async () => {
    const response = await mailchimp.ping.get();
    console.log(response);
  },
  subscribeUser: async (email) => {
    const subscriberHash = md5(email.toLowerCase());
    const response = await mailchimp.lists.setListMember(
      `${process.env.MAILCHIMP_LIST_ID}`,
      subscriberHash,
      {
        email_address: email,
        status_if_new: "subscribed",
        status: "subscribed",
      }
    );
    const { status, email_address, timestamp_opt } = response;

    return { email_address, status, timestamp_opt };
  },
};

module.exports = mailchimpAPI;
