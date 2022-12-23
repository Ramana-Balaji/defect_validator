const { isEmpty } = require("lodash");

const prepareMessage = (message = "", postfix = "", infix) => {
  let msg = "";
  const { env } = process;
  const { TIME_ZONE } = env;
  const currentDateTime = TIME_ZONE
    ? moment.tz(new Date(), "DD/MM/YYYY HH:mm:ss", TIME_ZONE)
    : new Date();
  if (postfix) {
    msg = `${currentDateTime} => ${message} ${postfix}`;
  } else {
    msg = `${currentDateTime} => ${message}`;
  }

  if (!isEmpty(infix)) {
    infix.forEach(({ replaceId, replaceValue }) => {
      const replaceIdRegExp = new RegExp(replaceId, "g");
      msg = msg.replace(replaceIdRegExp, replaceValue);
    });
  }
  return msg;
};

module.exports = {
  prepareMessage,
};
