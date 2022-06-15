import { useEtherBalance, useEthers, useLookupAddress } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import React, { useContext, useState } from "react";
import { colorModeContext } from "../../context";
import { UserCircleIcon } from "@heroicons/react/solid";

export function AppHeader() {
  const { activateBrowserWallet, account, active, deactivate } = useEthers();
  const { ens } = useLookupAddress(account);
  const balance = useEtherBalance(account);
  const { toggleColorMode } = useContext(colorModeContext);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement>();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(undefined);
  };

  const handleLogin = async () => {
    setAnchorElUser(undefined);
    activateBrowserWallet();
  };

  const handleLogout = () => {
    setAnchorElUser(undefined);
    deactivate();
  };

  const onClickAccount = () => {
    if (account) {
      navigator.clipboard.writeText(account);
    }
    setAnchorElUser(undefined);
  };

  return (
    <header className='h-14 bg-slate-800 px-10 flex justify-between'>
      <UserCircleIcon className='h-full py-2 text-neutral-300' />
    </header>
  );
}
