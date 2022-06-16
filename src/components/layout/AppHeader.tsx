import { useEtherBalance, useEthers, useLookupAddress } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";

function getMenuItemClass(active: boolean) {
  return `${
    active ? "bg-gray-100" : ""
  } block px-4 py-2 text-sm text-gray-700 cursor-pointer text-ellipsis overflow-hidden select-none`;
}

export function AppHeader() {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const { ens } = useLookupAddress(account);
  const balance = useEtherBalance(account);

  return (
    <div className="w-full bg-gray-800 px-10">
      <div className="relative flex items-center justify-between h-16">
        <div className="text-white">
          Trustworthy Rock-Paper-Scissors Tournament
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <UserIcon
                  className="h-8 w-8 rounded-full text-white"
                  aria-hidden="true"
                  aria-label="Open user menu"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {account ? (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={getMenuItemClass(active)}
                          onClick={() =>
                            account && navigator.clipboard.writeText(account)
                          }
                        >
                          {ens ?? account}
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div className={getMenuItemClass(active)}>
                          {formatEther(balance ?? 0)}
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={getMenuItemClass(active)}
                          onClick={() => deactivate()}
                        >
                          Logout
                        </div>
                      )}
                    </Menu.Item>
                  </>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={getMenuItemClass(active)}
                        onClick={() => activateBrowserWallet()}
                      >
                        Login
                      </div>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
