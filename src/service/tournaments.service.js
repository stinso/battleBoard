const { nodeAxiosWithCredentials } = require('../config/axios');

// Tournament Support APIs

export const getTournamentsService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-upcoming-tournaments`,
    body
  );
};

export const getMyTournamentsService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-all-tournaments`,
    body
  );
};

export const getHistoricalTournamentsService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `authenticated/get-historical-tournaments`,
    body
  );
};

export const getTournamentDetailsService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `/authenticated/get-tournament-details`,
    body
  );
};

export const getRecurringTournamentsService = async (body) => {
  return await nodeAxiosWithCredentials.post(
    `/admin/get-recurring-tournaments`,
    body
  );
};
