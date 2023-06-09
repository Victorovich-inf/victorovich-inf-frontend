import React from 'react';
import blue from '@mui/material/colors/blue';
import green from '@mui/material/colors/green';
import red from '@mui/material/colors/red';
import deepPurple from '@mui/material/colors/deepPurple';

const styles = theme => ({
  tabsRoot: {
    width: '100%',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {},
  },
  switcher: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '98px',
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      marginBottom: 76,
    },
    [theme.breakpoints.down('xs')]: {
      margin: 24,
      marginBottom: 72,
    },
  },
  tabs: { marginBottom: '50px' },
  tabsIndicator: { [theme.breakpoints.only('xs')]: { backgroundColor: theme.palette.background.paper } },
  scrollButtons: { [theme.breakpoints.only('xs')]: { color: theme.palette.primary.contrastText } },
  tab: { [theme.breakpoints.down('xs')]: { color: 'rgba(255,255,255,0.54)' } },
  tabSelected: { [theme.breakpoints.down('xs')]: { color: theme.palette.primary.contrastText } },
  tabLabelCont: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '11px',
      paddingRight: '11px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      paddingLeft: '5px',
      paddingRight: '5px',
    },
  },
  card: {
    overflow: 'inherit',
    position: 'relative',
    width: '328px',
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'column nowrap',
    borderRadius: '5px',
    transition: 'all .25s',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.07)',
    cursor: 'default',
    color: '#323C65',
    '&:hover': {
      boxShadow: '0 8px 20px rgba(0,0,0, .1)',
      transform: 'translateY(-5px)',
    },
    [theme.breakpoints.down('md')]: { width: 240 },
    [theme.breakpoints.down('sm')]: {
      width: 425,
      marginBottom: 86,
      margin: '0 auto',
    },
    [theme.breakpoints.down('xs')]: { width: 320 },
  },
  cardsRoot: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: { flexFlow: 'column nowrap' },
  },
  cardActive: {
    boxShadow: theme.shadows[8],
    transform: 'scale(1.01)',
  },
  tariffDecoration: {
    fontSize: 0,
    lineHeight: 0,
    position: 'absolute',
    left: 0,
    top: -10,
    width: 200,
    height: 50,
    zIndex: -1,
    background: '#ffffff',
    transform: 'skew(30deg, 0deg)',
    borderTopRightRadius: 4,
    boxShadow: '0 -5px 25px rgba(0, 0, 0, 0.07)',
    [theme.breakpoints.only('md')]: { width: 138 },
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      top: 0,
      left: -24,
      width: 46,
      height: '100%',
      background: 'white',
      transform: 'skew(-30deg, 0deg)',
      [theme.breakpoints.only('md')]: {
        width: 64,
        left: -16, // depends on padding of .cardContent
      },
    },
  },
  cardRecommended: {},
  includedOptions: {
    display: 'flex',
    flex: '1 1 auto',
    padding: '48px 24px',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      padding: '24px',
    },
  },
  includedOptionsTitle: {
    width: '20%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '125%',
    fontSize: 20,
    letterSpacing: '0.01em',
    color: '#323C65',
    opacity: 0.99,
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginBottom: 24,
    },
  },
  includedOptionsList: {
    width: '80%',
    display: 'flex',
    flex: '1 1 auto',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    padding: '1rem',
    borderRadius: 4,
    backgroundColor: '#F7F7F7',
    boxShadow: '0 15px 25px rgba(0, 0, 0, 0.07)',
    '& > li': {
      width: '50%',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '29px',
      fontSize: '20px',
      letterSpacing: '0.01em',
      color: '#323C65',
      opacity: '0.85',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      display: 'block',
      '& > li': { width: 'auto' },
    },
  },
  cardLabel: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '15px 60px',
    borderRadius: '2px 2px 0 0',
    [theme.breakpoints.down('md')]: { padding: '15px 16px' },
  },
  cardLabelText: { marginLeft: '8px' },
  ListItemIconOption: {
    width: '18px',
    height: '18px',
    '& > svg': {
      width: '18px',
      height: '18px',
    },
  },
  cardContent: {
    padding: '24px',
    [theme.breakpoints.only('md')]: { padding: '16px' },
  },
  cardTariff: {
    position: 'absolute',
    top: '-38px',
    marginBottom: '1rem',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '125%',
    fontSize: 22,
    letterSpacing: '0.01em',
    color: '#323C65',
    opacity: '0.95',
    [theme.breakpoints.only('md')]: { fontSize: 24 },
    [theme.breakpoints.only('sm')]: { textAlign: 'left' },
  },
  cardPriceCircle: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    margin: '0 auto',
    marginTop: 10,
    position: 'relative',
    [theme.breakpoints.down('xs')]: { marginBottom: 18 },
    [theme.breakpoints.only('sm')]: {
      width: 183,
      height: 183,
      position: 'absolute',
      top: '16px',
      left: '24px',
      marginTop: '0',
    },
  },
  circle_blue: { backgroundColor: blue['500'] },
  circle_main: { backgroundColor: theme.palette.primary.main },
  circle_purple: { backgroundColor: deepPurple.A400 },
  cardPriceContent: {
    minHeight: 150,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    color: '#323C65',
    lineHeight: '125%',
    letterSpacing: '0.01em',
    zIndex: '1',
  },
  list: {
    position: 'unset',
    zIndex: 1,
    marginTop: 8,
    '&::before': {
      content: "\'\'",
      left: 0,
      bottom: 0,
      position: 'absolute',
      width: '100%',
      height: '58%',
      zIndex: '0',
      backgroundColor: '#f7f7f7',
    },
    '& > li': {
      paddingTop: 8,
      paddingBottom: 8
    },
    '& > li:first-child p': {
      fontWeight: 'bold',
    },
  },
  listIcon: {
    color: green[400],
    marginRight: 16,
    width: 16,
  },
  listText: {
    padding: 0,
    [theme.breakpoints.only('md')]: { '& > p': { fontSize: 14 } },
  },
  listTextOption: { padding: 0 },
  checkIcon: { fill: green['200'] },
  cancelIcon: { fill: red['200'] },
  bottomWrap: {
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '125%',
  },
  priceWrap: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& > span': { opacity: 0.5 },
  },
  priceDecoration: {
    position: 'relative',
    marginLeft: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '125%',
    fontSize: '18px',
    letterSpacing: '.01em',
    color: '#323C65',
    [theme.breakpoints.only('md')]: { fontSize: '11px' },
  },
  priceLine: {
    background: 'linear-gradient(96.36deg, #F44E33 -9.49%, #EA004E 109.41%)',
    color: '#ffffff',
    padding: '0 4px',
    marginRight: 4,
  },
  amountRoot: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(1),
    '& > p': {
      fontSize: 28,
      fontWeight: 500,
      lineHeight: '125%',
    },
    [theme.breakpoints.down('md')]: { '& > p': { fontSize: 24 } },
  },
  totalRoot: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    '& > p': {
      fontSize: 18,
      fontWeight: 500,
      lineHeight: '125%',
    },
    [theme.breakpoints.only('md')]: { '& > p': { fontSize: 14 } },
  },
  amountMargin: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    color: '#797979',
    opacity: '0.8',
  },
  totalMargin: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    background: 'linear-gradient(104.26deg, #41D796 -22.88%, #299B6A 113.67%)',
    color: '#ffffff',
    padding: '0 4px',
  },
  cardActions: {
    justifyContent: 'center',
    padding: '0 24px 16px',
    [theme.breakpoints.down('md')]: { padding: '0 24px 16px' },
    [theme.breakpoints.only('sm')]: { padding: '0' },
    [theme.breakpoints.only('sm')]: { marginTop: 0 },
  },
  cardBtn: {
    margin: 0,
    padding: '8px 0',
    marginBottom: 8,
    [theme.breakpoints.down('md')]: { padding: '8px 0' },
  },
  cardBtnGreen: {
    backgroundColor: '#41D796',
    color: theme.palette.primary.contrastText,
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: '#3cc489',
      borderColor: 'transparent',
    },
  },
  cardDesctiption: {
    fontSize: '0.975rem',
    opacity: '0.85',
    alignSelf: 'flex-start',
    marginBottom: 16,
    [theme.breakpoints.only('md')]: { fontSize: '0.875rem' },
  },
  btn_blue: {
    backgroundColor: blue['500'],
    color: theme.palette.primary.contrastText,
    '&:hover': { backgroundColor: blue['600'] },
  },
  btn_main: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': { backgroundColor: theme.palette.primary.dark },
  },
  btn_purple: {
    backgroundColor: deepPurple.A400,
    color: theme.palette.primary.contrastText,
    '&:hover': { backgroundColor: deepPurple.A700 },
  },
  fieldSet: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '4px',
    overflow: 'hidden',
    [theme.breakpoints.only('xs')]: {},
  },
  discounts: {
    // position: 'relative',
  },
  discountsItem: {
    position: 'absolute',
    top: '-8px',
    right: '-48px',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: '#AEB5D4',
    [theme.breakpoints.only('sm')]: {
      top: -12,
      right: -10,
      fontSize: '10px',
    },
  },
  discountActive: {
    color: '#41D796',
  },
  itemDisabled: {
    opacity: '0.89',
    color: '#738598 !important',
  },
  disabled: {},
  formControlLabel: {
    display: 'flex',
    position: 'relative',
    padding: '16px 56px',
    margin: 0,
    minWidth: 136,
    justifyContent: 'center',
    color: '#ffffff',
    background: theme.palette.primary.main,
    borderRight: `2px solid ${theme.palette.primary.main}`,
    '&$disabled': {
      color: 'red',
    },
    '&:last-child': {
      borderRight: '0',
    },
    transition: `background, color ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
    [theme.breakpoints.down('sm')]: {
      border: 0,
      minWidth: 'auto',
      padding: 12,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
      '&:not(:last-of-type)::before': {
        width: '40px',
        height: '40px',
        right: '-10px',
      },
      '&:not(:first-of-type)': {
        paddingLeft: 22,
      },
    },
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      padding: '16px !important',
      '&::before': { display: 'none' },
      '&::after': { display: 'none' },
    },
  },
  labelActive: {
    color: theme.palette.primary.main,
    background: 'white',
  },
  formControlLabelSpan: {
    position: 'relative',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '16px',
    fontSize: '16px',
    color: 'inherit',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      lineHeight: '14px',
      fontSize: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      fontWeight: '400',
      lineHeight: '14px',
      fontSize: '14px',
    },
  },
  formControlRadio: { display: 'none' },
  choosen: {},
  choosenPaper: {
    minWidth: '600px',
    maxHeight: 'calc(100% - 32px)',
    [theme.breakpoints.down('sm')]: {
      margin: '8px',
      minWidth: 'auto',
    },
  },
  cardTariffDecoration: {

  },
  choosenTitle: {
    width: '100%',
    padding: '16px 24px',
    marginBottom: '16px',
  },
  choosenMonth: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '16px',
    textTransform: 'uppercase',
    position: 'relative',
    padding: '10px 16px',
    borderRadius: '8px 2px 2px 8px',
    '&:after': {
      content: "''",
      display: 'block',
      borderTop: '17px solid transparent',
      borderBottom: '17px solid transparent',
      borderLeft: `21px solid ${theme.palette.primary.main}`,
      position: 'absolute',
      top: '50%',
      left: '100%',
      transform: 'translateY(-50%)',
    },
  },
  choosenContent: {},
  choosenContentWrap: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  choosenPeriods: { marginBottom: '16px' },
  choosenActions: { justifyContent: 'center' },
  choosenPrices: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardPriceHelp: {
    cursor: 'pointer',
    alignSelf: 'center',
  },
  cardPriceTooltip: { fontSize: theme.typography.body1.fontSize },
  cardPricePromo: {
    padding: '0 24px 16px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  cardPricePromoBtn: {
    cursor: 'pointer',
    color: theme.palette.primary.light,
  },
  priceItem: {
    display: 'flex',
    alignItems: 'baseline',
    paddingBottom: '16px',
    width: '100%',
  },
  price: {
    color: '#41D796',
    position: 'relative',
    fontSize: 48,
    fontWeight: 'bold',
    [theme.breakpoints.only('md')]: { fontSize: 36 },
  },
  ruble: {
    color: '#41D796',
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '900',
    [theme.breakpoints.only('md')]: { fontSize: 24 },
  },
  month: {
    color: '#41D796',
    fontSize: 18,
    fontWeight: '900',
    [theme.breakpoints.only('md')]: { fontSize: 18 },
  },
  promoText: {
    color: '#323c65',
    margin: '30px 10px 0 10px',
    opacity: 1,
    font: '400 14px/24px Roboto,sans-serif',
    textAlign: 'center'
  },
});

export default styles;
