import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core';
import { axios } from 'src/utils/axiosHook';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  avatar: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white
  }
}));

const ContractInfo = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [totalRewards, setTotalRewards] = useState(0);

  const getContractInfo = useCallback(async () => {
    try {
      const response = await axios.get('/contractInfo');

      if (isMountedRef.current) {
        setTotalRewards(response.data.contractInfo.rewards);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getContractInfo();
  }, [getContractInfo]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Staking Contract Info"
      />
      <Divider />
      <List disablePadding>
        <ListItem
          key={'Max Cap'}
        >
          <ListItemText
            primary={'Max Cap'}
            primaryTypographyProps={{ variant: 'h6' }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
          >
            250,000,000
          </Typography>
        </ListItem>
        <Divider />
        <ListItem
          key={'Total Rewards'}
        >
          <ListItemText
            primary={'Total Rewards'}
            primaryTypographyProps={{ variant: 'h6' }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
          >
            <NumberFormat value={totalRewards} displayType={'text'} thousandSeparator={true} /> CHAIN
          </Typography>
        </ListItem>
        <Divider />
        <ListItem
          key={'Address'}
        >
          <ListItemText
            primary={'Address'}
            primaryTypographyProps={{ variant: 'h6' }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
          >
            <Link
              component="a"
              color="inherit"
              underline="always"
              href="https://etherscan.io/address/0x9b7fcaebe9a69eceeab72142ed35a238775d179a"
              target="_blank"
            >
              0x9B7...D179a
            </Link>
          </Typography>
        </ListItem>
        <Divider />
        <ListItem
          key={'totalSupply'}
        >
          <ListItemText
            primary={'Total Supply'}
            primaryTypographyProps={{ variant: 'h6' }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
          >
          499,999,998
          </Typography>
        </ListItem>
        <Divider />
        <ListItem
          key={'unstakingPeriod'}
        >
          <ListItemText
            primary={'Unstaking Period'}
            primaryTypographyProps={{ variant: 'h6' }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
          >
          7 Days
          </Typography>
        </ListItem>
      </List>
    </Card>
  );
};

ContractInfo.propTypes = {
  className: PropTypes.string
};

export default ContractInfo;
