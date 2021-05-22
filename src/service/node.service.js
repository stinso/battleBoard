const {
  nodeAxios,
  nodeAxiosWithCredentials,
  axiosCoinGecko,
  formDataAxiosServiceCentralServer,
  nodeAxiosForXbox,
  formDataAxiosService,
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

export const convertChaintoUSDService = async (body) => {
  return await axiosCoinGecko.get();
};

export const getMyEventsService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-all-events`,
    body
  );
};

//Notifications Services
export const notificationPollingService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/my-notification`,
    body
  );
};

export const markNotificationReadService = async (body) => {
  return await nodeAxiosWithCredentials.post(`authenticated/mark-read`, body);
};

export const getEventDetailsFromId = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-event-details`,
    body
  );
};

export const getLiveStatsFromID = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-event-stats`,
    body
  );
};

export const enrollInAnEventService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `/authenticated/enroll-in-event`,
    body
  );
};

export const enrollInASponsoredEventService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `/authenticated/enroll-in-sponsored-event`,
    body
  );
};

export const disenrollFromEventService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/disenroll-from-event`,
    body
  );
};

export const getTotalWinningsService = async (body) => {
  return await formDataAxiosService.post(
    `authenticated/get-total-winnings`,
    body
  );
};

export const getTotalEventsService = async (body) => {
  return await formDataAxiosService.post(
    `authenticated/get-total-events-played`,
    body
  );
};

//Profile Page APIs below
export const uploadProfileImageService = async (body) => {
  return await formDataAxiosServiceCentralServer.post(
    `authenticated/set-user-dp`,
    body
  );
};

export const getHistoricalEventsService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-historical-events`,
    body
  );
};

export const userInfoService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-user-info`,
    body
  );
};

export const getMyInfoService = async (body) => {
  return await nodeAxiosWithCredentials.post(`authenticated/get-my-info`, body);
};

//Admin Panel APIs below

//Single event APIs
export const getEventsService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-upcoming-events`,
    body
  );
};

export const adminAddEventService = async (body) => {
  return await nodeAxiosWithCredentials.post(`admin/schedule-event`, body);
};

export const adminUpdateEventService = async (body) => {
  return await nodeAxiosWithCredentials.post(`admin/update-event`, body);
};

export const adminDeleteEventService = async (body) => {
  return await nodeAxiosWithCredentials.post(`admin/delete-event`, body);
};

//Recurring Events APIs
export const getRecurringEventsService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `/admin/get-recurring-events`,
    body
  );
};

export const adminAddRecurringEventService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `admin/schedule-recurring-event`,
    body
  );
};

export const adminDeleteRecurringEventService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `admin/delete-recurring-event`,
    body
  );
};

//Random Admin Central Server APIS
export const adminVerifyEmailService = async (body) => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `admin/verify-email`,
    body
  );
};

export const adminChangeEmailService = async (body) => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `admin/change-email`,
    body
  );
};

export const changeUserPassword = async (body) => {
  return await nodeAxiosWithCredentialsCentralServer.post(
    `authenticated/change-password`,
    body
  );
};

export const getLinkedNetworkService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `public/get-linked-networks`,
    body
  );
};

export const deleteLinkedNetworkService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/delete-linked-network`,
    body
  );
};

export const linkOAuthNetwork = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/link-oauth-network`,
    body
  );
};

export const getOAuthURL = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-oauth-code-url`,
    body
  );
};

//Followers and Following Services
export const followService = async (body) => {
  return await nodeAxiosWithCredentials.post(`authenticated/follow`, body);
};

export const checkIsFollowingService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/is-following`,
    body
  );
};

export const getFollowersService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-followers`,
    body
  );
};

export const getFollowingService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-followings`,
    body
  );
};

export const unFollowService = async (body) => {
  return await nodeAxiosWithCredentials.post(`authenticated/unfollow`, body);
};

//Challenges Services
export const createChallengeService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/create-challenge`,
    body
  );
};

export const cancelChallengeService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/cancel-challenge`,
    body
  );
};

export const acceptChallengeService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/accept-challenge`,
    body
  );
};

export const rejectChallengeService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/reject-challenge`,
    body
  );
};

export const modifyChallengeService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/modify-challenge`,
    body
  );
};

export const getChallengeService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-challenges`,
    body
  );
};

//Madden Support APIS

export const submitEventResultService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/user-attestation`,
    body
  );
};

export const submitEvidenceService = async (body) => {
  return await formDataAxiosService.post(
    `authenticated/submit-winning-proof`,
    body
  );
};

export const getDisputesService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `admin/get-conflicted-events`,
    body
  );
};

export const resolveDisputeService = async (body) => {
  return await nodeAxiosWithCredentials.post(`admin/winner-attestation`, body);
};

export const addPSNTagService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/link-network`,
    body
  );
};

export const getBannedPlayersService = async () => {
  return await nodeAxiosWithCredentials.get(`admin/get-banned-users`);
};

export const unbanPlayerService = async (body) => {
  return await nodeAxiosWithCredentials.post(`admin/unban-user`, body);
};

export const sendSubscriptionOfServiceWorkerService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/register-subscription`,
    body
  );
};

export const claimNetworkService = async (body) => {
  return await formDataAxiosService.post(
    `authenticated/claim-network-account`,
    body
  );
};

export const getNetworkClaimsService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `admin/get-network-account-claim`,
    body
  );
};

export const approveNetworkClaimService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `admin/approve-network-account-claim`,
    body
  );
};

export const rejectNetworkClaimService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `admin/reject-network-account-claim`,
    body
  );
};
