import moment from "moment";
export const converttimestamp = (inputformat) => {
  var a = moment(inputformat);
  return a.format("D MMM YYYY");
};
