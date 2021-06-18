import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { verifyEmailService } from '../../../service/node.service.js';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const VerifyEmail = () => {
  const history = useHistory();
  const [token, setToken] = useState('');
  const query = useQuery();

  const verifyToken = async () => {
    try {
      const { data } = await verifyEmailService({ token });
      if (data.success === true) {
        history.push('/login');
      }
    } catch (error) {
      console.log(error);
      history.push('/500');
    }
  };

  useEffect(() => {
    let token = query.get('token');
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  return (
    <Typography color="textPrimary" gutterBottom variant="h2">
      Please Wait, Redirecting...
    </Typography>
  );
};

export default VerifyEmail;
