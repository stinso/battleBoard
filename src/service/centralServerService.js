const {
  formDataAxiosServiceCentralServer,
  nodeAxiosWithCredentialsCentralServer
} = require('../config/axios');

export const registerUser = async (body) => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `/public/register`,
    body
  );
};

export const loginService = async (body) => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `/public/login`,
    body
  );
};

export const logoutService = async () => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `/authenticated/logout`,
    {}
  );
};

export const getBalanceFromCS = async (body) => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `/authenticated/get-balance`,
    body
  );
};

export const postReportIssue = async (body) => {
  return await formDataAxiosServiceCentralServer.post(
    `/authenticated/report-issue`,
    body
  );
};

export const verifyEmailService = async (body) => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `/public/verify-email-token`,
    body
  );
};

export const recoverPassword = async (body) => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `/public/send-reset-link`,
    body
  );
};

export const verifyForgotPasswordTokenService = async (body) => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `/public/verify-forgot-password-token`,
    body
  );
};

export const resetForgottenPasswordService = async (body) => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `/public/reset-forgotten-password`,
    body
  );
};

export const changeUserPassword = async (body) => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `authenticated/change-password`,
    body
  );
};

export const uploadProfileImageService = async (body) => {
  return await formDataAxiosServiceCentralServer.post(
    `authenticated/set-user-dp`,
    body
  );
};
