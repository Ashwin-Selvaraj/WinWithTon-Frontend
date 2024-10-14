import React, { useState } from "react";

const INITIAL_USER_STATE = {
  userDetails: {
    id: 1,
    telegramDetails: {},
    userDetails: {},
    refererCount: 0,
    selectedDay: 1,
    isLoading: true,
  },
};
const INITIAL_STATE = {
  gameScreen: {
    gameReward: 0,
  },
  updateUserInfo: () => undefined,
};

export const UserInfoContext = React.createContext({
  ...INITIAL_STATE,
});

export const UserInfoProvider = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userDetails, setUserdetails] = useState(
    INITIAL_USER_STATE.userDetails
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const contextValue = React.useMemo(() => {
    return {
      userDetails: userDetails,
      updateUserInfo: setUserdetails,
    };
  }, [userDetails]);

  return (
    <UserInfoContext.Provider value={contextValue}>
      {children}
    </UserInfoContext.Provider>
  );
};
