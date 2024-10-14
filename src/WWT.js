import React, { useEffect, useState, useRef } from "react";
import './WWT.css';
import useUserInfo from "../Hooks/useUserInfo";
import {
  Login, getUserDetails
} from "../apis/user";
import { get } from "https";

const WWT = () => {
  const {userDetails, updateUserInfo} =
    useUserInfo();

  const latestUserDetails = useRef(userDetails);

  useEffect(() => {
    latestUserDetails.current = userDetails;
    latestWatchScreen.current = watchScreen;
  }, [userDetails]);

  useEffect(() => {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    const userData = window.Telegram.WebApp.initDataUnsafe.user;
    const urlParams = new URLSearchParams(window.location.search);
    const referredIdFromUrl = urlParams.get("start");

    if (userData) {
      var data;
      if (referredIdFromUrl && referredIdFromUrl !== "undefined") {
        data = {
          name: userData?.first_name,
          telegramId: String(userData?.id),
          referredById: referredIdFromUrl,
        };
      } else {
        data = {
          name: userData?.first_name,
          telegramId: String(userData?.id),
        };
      }
      getUserDetails(data);

      updateUserInfo((prev) => ({
        ...prev,
        telegramDetails: userData,
      }));
    }
    const data1 = {
      name: "Ashwin",
      telegramId: "9578816602",
    };
    getUserDetails(data1);
    // s;
    const storedData1 = localStorage.getItem("watchStreak");
    const parsedData1 = storedData1 ? JSON.parse(storedData1) : 0;

  }, []);


  const getUserDetails = async (data) => {
    const pointDetails = localStorage.getItem("pointDetails");
    const parsedData = JSON.parse(pointDetails);

    let data1;
    let userDetails;

    // If there are watch seconds, prepare data and make the update call
    if (parsedData?.watchSec) {
      data1 = {
        telegramId: data?.telegramId,
        userWatchSeconds: parsedData?.watchSec,
        boosterPoints: String(
          Number(parsedData?.tapPoints) + Number(parsedData?.boosterPoints)
        ),
      };

      if (parsedData?.booster[0]) {
        data1.boosters = parsedData?.booster;
      }

      // Use Promise.all to parallelize the API calls and updates
      try {
        await Promise.all([
          updateWatchSecOnly(data1),
          localStorage.setItem(
            "pointDetails",
            JSON.stringify({
              tapPoints: 0,
              watchSec: 0,
              boosterPoints: 0,
              booster: [0],
            })
          ),
        ]);

        userDetails = await UserDeatils(data);
        console.log(JSON.stringify(userDetails) + "kjhgfds");
      } catch (error) {
        console.error("Error in updating or fetching user details:", error);
      }

      // Update state after both async calls are completed
      if (userDetails) {
        updateUserInfo((prev) => ({
          ...prev,
          userDetails: userDetails,
        }));

        updatewatchScreenInfo((prev) => ({
          ...prev,
          boostersList: userDetails?.boosters,
          totalReward: userDetails?.totalRewards,
          tapPoints: 0,
          booster: false,
          boosterSec: 0,
          boosterPoints: 0,
          boosterDetails: {},
          watchSec: 0,
        }));
      }
    } else {
      // If no watch seconds, fetch user details only
      try {
        userDetails = await UserDeatils(data);
      } catch (error) {
        console.error("Error in fetching user details:", error);
      }

      // Update state after fetching user details
      if (userDetails) {
        updateUserInfo((prev) => ({
          ...prev,
          userDetails: userDetails,
        }));

        updatewatchScreenInfo((prev) => ({
          ...prev,
          boostersList: userDetails?.boosters,
          totalReward: userDetails?.totalRewards,
        }));
      }
    }
    return userDetails;
  };

  const getUserDetailsOnly = async () => {
    let userDetails1;

    try {
      userDetails1 = await getUserDetails1(userDetails.userDetails?.telegramId);
      console.log(JSON.stringify(userDetails) + "ppp");
    } catch (error) {
      console.error("Error in updating or fetching user details:", error);
    }

    // Update state after both async calls are completed
    if (userDetails) {
      updateUserInfo((prev) => ({
        ...prev,
        userDetails: userDetails1,
      }));

      updatewatchScreenInfo((prev) => ({
        ...prev,
        boostersList: userDetails1?.boosters,
        totalReward: userDetails1?.totalRewards,
        tapPoints: 0,
        booster: false,
        boosterSec: 0,
        boosterPoints: 0,
        boosterDetails: {},
        watchSec: 0,
      }));
    }

    return userDetails;
  };

  
  const goToTheRefererPage = (component, name) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: latestUserDetails.current.currentComponent,
      lastComponentText: latestUserDetails.current.currentComponentText,
      refererCount: latestUserDetails.current.refererCount + 1,
    }));
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
        position: "fixed",
        overflow: "hidden",
      }}
    >
      {/* {userDetails?.userDetails?.isLoading && <Spinner />} */}

      <audio ref={audioRef}>
        <source src={porotta} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {latestUserDetails.current.isHeader && (
        <div className="box" style={{ height: "7%", width: "100%" }}>
          <Header />
        </div>
      )}
      <div
        style={{
          position: "fixed",
          zIndex: 1,
          height: "17%",
          width: "100%",
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <div style={{ position: "absolute", height: "100%", width: "100%" }}>
            <img
              src={bottomShape}
              alt="border"
              style={{ height: "100%", width: "100%" }}
              className="bottomImg"
            />
          </div>
          <div
            className="bottomtab"
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
              position: "absolute",
              alignItems: "flex-end",
            }}
          >
            <div
              style={
                userDetails.currentComponentText === "IntroImg" ||
                watchScreen.booster
                  ? {
                      height: "80%",
                      width: "20%",
                      position: "relative",
                      marginBottom: "10px",
                      opacity: 0.5,
                    }
                  : {
                      height: "80%",
                      width: "20%",
                      position: "relative",
                      marginBottom: "10px",
                    }
              }
            >
              <div
                style={{ position: "absolute", height: "100%", width: "100%" }}
                onClick={() => {
                  if (
                    !watchScreen.booster &&
                    userDetails.currentComponentText !== "IntroImg"
                  ) {
                    toogleMenu();
                  }
                }}
              >
                <img
                  src={bottomLeft}
                  alt="border"
                  style={{ height: "100%", width: "100%" }}
                  className="bottomImg"
                />
              </div>
              <div
                onClick={() => {
                  if (
                    !watchScreen.booster &&
                    userDetails.currentComponentText !== "IntroImg"
                  ) {
                    toogleMenu();
                  }
                }}
                style={{
                  width: "100%",
                  position: "absolute",
                  display: "flex",
                  top: "35%",
                  left: "-3%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={menuIcon}
                  alt="border"
                  style={{
                    width: "50%",
                    // marginLeft: "10px",
                    // marginTop: "-10px",
                  }}
                  className="bottomImg"
                />
              </div>
            </div>
            <div
              style={{
                height: "100%",
                width: "60%",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -9,
                  height: "100%",
                  width: "175%",
                  display: "flex",
                  alignItems: "end",
                }}
              >
                <img
                  src={bottomcenter}
                  alt="border"
                  style={{ height: "85%", width: "63%" }}
                  className="bottomImg"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: -9,
                  height: "100%",
                  width: "175%",
                  display: "flex",
                  alignItems: "end",
                }}
              >
                {userDetails.currentComponentText === "TVPage" ? (
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 29,
                        height: "100%",
                        width: "45%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 11,
                          color: "rgba(0, 255, 41, 1)",
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "end",
                          justifyContent: "center",
                        }}
                      >
                        BOOSTERS
                      </div>
                      <img
                        src={boosterText}
                        alt="border"
                        style={{
                          height: "32%",
                          width: "70%",
                          padding: "10px",
                        }}
                        className="bottomImg"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <img
                  src={greenLineBottom}
                  alt="border"
                  style={{
                    height: "85%",
                    width: "63%",
                    padding: "10px",
                    position: "absolute",
                  }}
                  className="bottomImg"
                />
              </div>
              {userDetails.currentComponentText === "TVPage" ? (
                <div
                  style={{
                    position: "relative",
                    left: 0,
                    top: 10,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Boosters />
                </div>
              ) : null}

              {userDetails.currentComponentText !== "TVPage" &&
              userDetails.currentComponentText !== "IntroImg" ? (
                <div
                  style={{
                    position: "relative",
                    left: 0,
                    top: 10,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      onClick={() => {
                        reclaimUserDetails();
                      }}
                      src={switchOnTv}
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
              ) : null}

              {userDetails.currentComponentText === "IntroImg" ? (
                <div
                  style={{
                    position: "relative",
                    left: 0,
                    top: 10,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    if (
                      userDetails?.userDetails?.telegramId &&
                      !watchScreen.booster
                    ) {
                      goToThePage(Tv, "TVPage");
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={ContinueText} style={{ width: "90%" }} />
                  </div>
                </div>
              ) : null}
            </div>
            <div
              style={
                userDetails.currentComponentText === "IntroImg" ||
                watchScreen.booster
                  ? {
                      height: "80%",
                      width: "20%",
                      position: "relative",
                      marginBottom: "10px",
                      opacity: 0.5,
                    }
                  : {
                      height: "80%",
                      width: "20%",
                      position: "relative",
                      marginBottom: "10px",
                    }
              }
              onClick={() => {
                if (
                  !watchScreen?.booster &&
                  userDetails.currentComponentText !== "IntroImg"
                ) {
                  const values = JSON.parse(
                    localStorage.getItem("pointDetails")
                  );
                  var data = {
                    telegramId: userDetails.userDetails.telegramId,
                    userWatchSeconds: values.watchSec + 1,
                    boosterPoints: String(values.tapPoints),
                  };
                  addWatchSecapiMarket(data);
                  // goToTheRefererPage(ReferPage, "ReferPage");
                }
              }}
            >
              <div
                style={{ position: "absolute", height: "100%", width: "100%" }}
                onClick={() => {}}
              >
                <img
                  src={bottomRight}
                  alt="border"
                  style={{ height: "100%", width: "100%" }}
                  className="bottomImg"
                />
              </div>

              <div
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={referIcon}
                  alt="border"
                  style={{ width: "30%", objectFit: "contain" }}
                  className="bottomImg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: userDetails.isHeader ? "77%" : "86%",
          width: "100%",
          zIndex: "-999",
          backgroundColor: "black",
          position: "relative",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {userDetails.currentComponent && <userDetails.currentComponent />}
        </div>
        <Tvborder />
      </div>
    </div>
  );
};

export default WWT;
