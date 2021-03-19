import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import axios from 'axios'
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import ResultsStakers from './ResultsStakers';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

const ProductListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [stakersList, setStakersList] = useState([]);
  const [currentTab, setCurrentTab] = useState('stakers');

  const tabs = [
    { value: 'stakers', label: 'Stakers' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getStakersList = useCallback(async () => {
    try {
      const response = await axios.get('/stakerslist')      

      if (isMountedRef.current) {
        setStakersList(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getStakersList();
  }, [getStakersList]);

  return (
    <Page
      className={classes.root}
      title="Leaderboard"
    >
      <Container maxWidth="sm">
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'stakers' && <ResultsStakers stakersList={stakersList} />}
        </Box>
      </Container>
    </Page>
  );
};

export default ProductListView;