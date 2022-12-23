import React from "react";
import { useWindowScroll } from "react-use";
import PropTypes from "prop-types";
import { ArrowUpward } from "@material-ui/icons";
import { Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  goTop: {
    "& a": {
      backgroundColor: "#3f51b5",
      boxShadow: "0px 6px 15px 0px rgb(0 0 0 / 10%)",
      position: "fixed",
      bottom: "2em",
      right: "2em",
      fontSize: "20px",
      lineHeight: "15px",
      textAlign: "center",
      padding: "9px 11px",
      borderRadius: "9px",
      zIndex: "3",
      cursor: "pointer",
      textDecoration: "none !important",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#303f9f",
        color: "#FFF !important",
      },
    },
  },
  arrowIcon: {
    animation: "scrollTop .5s ease infinite alternate",
  },
}));

const DefaultLayout = (props) => {
  const classes = useStyles();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const { y: pageYOffset } = useWindowScroll();

  return (
    <>
      {props.children}
      <div className={classes.goTop}>
        {pageYOffset > 400 && (
          <Link onClick={scrollToTop}>
            <span className={`${classes.arrowIcon} arrow_carrot-up arrows`}>
              <ArrowUpward />
            </span>
          </Link>
        )}
      </div>
    </>
  );
};

DefaultLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DefaultLayout;
