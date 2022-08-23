import useSWR from 'swr';
import { useQuery } from 'react-query';
import instance from './AxiosClient';

export const fetcher = async (url: RequestInfo) => {
  const r = await fetch(`https://api.serverside.fun${url}`);
  return await r.json();
};

async function getUserData() {
  const response = await instance.get('/auth/user');
  console.log(response);
  return response.data.user;
}

async function getGameData() {
  const response = await instance.get('/v1/games');
  console.log(response);
  return response.data.games;
}

async function getUnique() {
  const response = await instance.get('/v1/stats');
  console.log(response);
  return response.data.cache;
}

const useUser = () => {
  const { data: user, error, isFetching } = useQuery('user', getUserData);
  return { user, error, isFetching };
};
export const useGames = () => {
  const { data: games, error, isLoading } = useQuery('games', getGameData);
  return { games, error, isLoading };
};
export const useUnique = () => {
  const { data: cache, error, isLoading } = useQuery('cache', getUnique);
  return { cache, error, isLoading };
};

export default useUser;
