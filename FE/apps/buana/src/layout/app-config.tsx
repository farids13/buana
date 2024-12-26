"use client";
import {PrimeReactContext} from "primereact/api";
import {Button} from "primereact/button";
import type {InputSwitchChangeEvent} from "primereact/inputswitch";
import {InputSwitch} from "primereact/inputswitch";
import type {RadioButtonChangeEvent} from "primereact/radiobutton";
import {RadioButton} from "primereact/radiobutton";
import {Sidebar} from "primereact/sidebar";
import {classNames} from "primereact/utils";
import type {ReactElement} from "react";
import {useContext, useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {LayoutContext} from "./context/layout-context";
import type {AppConfigProps, ColorScheme} from "@/types/types";

interface Scene {
  id: number;
  sceneName: string;
  colorScheme: ColorScheme;
  colorSchemeColor: string;
  menuTheme: string;
  menuThemeColor: string;
  componentTheme: string;
  componentThemeColor: string;
  topbarTheme: string;
  topbarThemeColor: string;
  menuMode: string;
  cardColor: string;
}

function AppConfig(props: AppConfigProps): ReactElement {
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    isSlim,
    isSlimPlus,
    isHorizontal,
  } = useContext(LayoutContext);
  const {setRipple, changeTheme} = useContext(PrimeReactContext);
  const scales = [12, 13, 14, 15, 16];
  const componentThemes = [
    {name: "purple", color: "#6f42c1"},
    {name: "indigo", color: "#6610f2"},
    {name: "pink", color: "#d63384"},
    {name: "blue", color: "#0d6efd"},
    {name: "cyan", color: "#0dcaf0"},
    {name: "teal", color: "#20c997"},
    {name: "green", color: "#198754"},
    {name: "yellow", color: "#ffc107"},
    {name: "orange", color: "#fd7e14"},
    {name: "black", color: "#000000"},
  ];

  const menuThemes: {
    name: string;
    color: string;
  }[] = [
    {name: "light", color: "#ffffff"},
    {name: "dark", color: "#212529"},
  ];

  const topbarThemes = [
    {name: "light", color: "#FFFFFF"},
    {name: "dark", color: "#212529"},
    {name: "blue", color: "#1565C0"},
    {name: "purple", color: "#6A1B9A"},
    {name: "pink", color: "#AD1457"},
    {name: "cyan", color: "#0097A7"},
    {name: "teal", color: "#00796B"},
    {name: "green", color: "#43A047"},
    {name: "yellow", color: "#FBC02D"},
    {name: "orange", color: "#FB8C00"},
    {name: "indigo", color: "#3F51B5"},
  ];

  const scenes: Scene[] = [
    {
      id: 0,
      sceneName: "Green Light",
      colorScheme: "light",
      colorSchemeColor: "#EFEFEF",
      menuTheme: "light",
      menuThemeColor: "#ffffff",
      componentTheme: "green",
      componentThemeColor: "#198754",
      topbarTheme: "green",
      topbarThemeColor: "#43A047",
      menuMode: "static",
      cardColor: "#ffffff",
    },
    {
      id: 1,
      sceneName: "Dark Sea",
      colorScheme: "dark",
      colorSchemeColor: "#20262e",
      menuTheme: "dark",
      menuThemeColor: "#2a323d",
      componentTheme: "cyan",
      componentThemeColor: "#0dcaf0",
      topbarTheme: "cyan",
      topbarThemeColor: "#0097A7",
      menuMode: "static",
      cardColor: "#2a323d",
    },
    {
      id: 2,
      sceneName: "Blue Marble",
      colorScheme: "light",
      colorSchemeColor: "#EFEFEF",
      menuTheme: "light",
      menuThemeColor: "#ffffff",
      componentTheme: "blue",
      componentThemeColor: "#0d6efd",
      topbarTheme: "blue",
      topbarThemeColor: "#1565C0",
      menuMode: "static",
      cardColor: "#ffffff",
    },
    {
      id: 3,
      sceneName: "Emerald",
      colorScheme: "dark",
      colorSchemeColor: "#20262e",
      menuTheme: "dark",
      menuThemeColor: "#2a323d",
      componentTheme: "teal",
      componentThemeColor: "#20c997",
      topbarTheme: "teal",
      topbarThemeColor: "#00796B",
      menuMode: "static",
      cardColor: "#2a323d",
    },
    {
      id: 4,
      sceneName: "Piano Black",
      colorScheme: "light",
      colorSchemeColor: "#EFEFEF",
      menuTheme: "light",
      menuThemeColor: "#ffffff",
      componentTheme: "black",
      componentThemeColor: "#000000",
      topbarTheme: "light",
      topbarThemeColor: "#FFFFFF",
      menuMode: "static",
      cardColor: "#ffffff",
    },
    {
      id: 5,
      sceneName: "Bolt",
      colorScheme: "dark",
      colorSchemeColor: "#20262e",
      menuTheme: "dark",
      menuThemeColor: "#2a323d",
      componentTheme: "yellow",
      componentThemeColor: "#ffc107",
      topbarTheme: "yellow",
      topbarThemeColor: "#FBC02D",
      menuMode: "static",
      cardColor: "#2a323d",
    },
    {
      id: 6,
      sceneName: "Amber",
      colorScheme: "light",
      colorSchemeColor: "#EFEFEF",
      menuTheme: "dark",
      menuThemeColor: "#212529",
      componentTheme: "yellow",
      componentThemeColor: "#ffc107",
      topbarTheme: "yellow",
      topbarThemeColor: "#FBC02D",
      menuMode: "horizontal",
      cardColor: "#ffffff",
    },
    {
      id: 7,
      sceneName: "Kingdom",
      colorScheme: "dark",
      colorSchemeColor: "#20262e",
      menuTheme: "dark",
      menuThemeColor: "#2a323d",
      componentTheme: "indigo",
      componentThemeColor: "#6610f2",
      topbarTheme: "purple",
      topbarThemeColor: "#6A1B9A",
      menuMode: "reveal",
      cardColor: "#2a323d",
    },
  ];

  useEffect(() => {
    if (isSlim() || isSlimPlus() || isHorizontal()) {
      setLayoutState((prevState) => ({...prevState, resetMenu: true}));
    }
  }, [layoutConfig.menuMode]);

  const onInlineMenuPositionChange = (e: RadioButtonChangeEvent): void => {
    setLayoutConfig((prevState) => ({
      ...prevState,
      menuProfilePosition: e.value,
    }));
  };
  const onConfigButtonClick = (): void => {
    setLayoutState((prevState) => ({
      ...prevState,
      configSidebarVisible: true,
    }));
  };

  const onConfigSidebarHide = (): void => {
    setLayoutState((prevState) => ({
      ...prevState,
      configSidebarVisible: false,
    }));
  };

  const changeInputStyle = (e: RadioButtonChangeEvent): void => {
    setLayoutConfig((prevState) => ({...prevState, inputStyle: e.value}));
  };

  const changeRipple = (e: InputSwitchChangeEvent): void => {
    setRipple(e.value!);
    setLayoutConfig((prevState) => ({
      ...prevState,
      ripple: e.value!,
    }));
  };

  const changeMenuMode = (e: RadioButtonChangeEvent): void => {
    setLayoutConfig((prevState) => ({...prevState, menuMode: e.value}));
  };

  const onChangeMenuTheme = (name: string): void => {
    setLayoutConfig((prevState) => ({...prevState, menuTheme: name}));
  };

  const changeColorScheme = (colorScheme: ColorScheme): void => {
    changeTheme?.(layoutConfig.colorScheme, colorScheme, "theme-link", () => {
      setLayoutConfig((prevState) => ({
        ...prevState,
        colorScheme,
        menuTheme: colorScheme === "dark" ? "dark" : "light",
      }));
    });
  };

  const _changeTheme = (componentTheme: string): void => {
    changeTheme?.(
      layoutConfig.componentTheme,
      componentTheme,
      "theme-link",
      () => {
        setLayoutConfig((prevState) => ({...prevState, componentTheme}));
      }
    );
  };
  const onTopbarChangeTheme = (name: string): void => {
    setLayoutConfig((prevState) => ({...prevState, topbarTheme: name}));
  };

  const decrementScale = (): void => {
    setLayoutConfig((prevState) => ({
      ...prevState,
      scale: prevState.scale - 1,
    }));
  };

  const incrementScale = (): void => {
    setLayoutConfig((prevState) => ({
      ...prevState,
      scale: prevState.scale + 1,
    }));
  };

  const applyScale = (): void => {
    document.documentElement.style.fontSize = `${layoutConfig.scale}px`;
  };

  useEffect(() => {
    applyScale();
  }, [layoutConfig.scale]);

  const changeScene = (item: any): void => {
    changeTheme?.(
      layoutConfig.componentTheme,
      item.componentTheme,
      "theme-link",
      () => {
        changeColorScheme(item.colorScheme);
        setLayoutConfig((prevState) => ({
          ...prevState,
          colorScheme: item.colorScheme,
          componentTheme: item.componentTheme,
          menuMode: item.menuMode,
        }));
        onTopbarChangeTheme(item.topbarTheme);
        onChangeMenuTheme(item.menuTheme);
        setSelectedScene(item);
      }
    );
  };

  return (
    <>
      <button
        className="layout-config-button config-link"
        onClick={onConfigButtonClick}
        type="button"
      >
        <i className="pi pi-cog" />
      </button>

      <Sidebar
        className="layout-config-sidebar w-18rem"
        onHide={onConfigSidebarHide}
        position="right"
        visible={layoutState.configSidebarVisible}
      >
        <h5>Layout/Theme Scale</h5>
        <div className="flex align-items-center">
          <Button
            className="w-2rem h-2rem mr-2"
            disabled={layoutConfig.scale === scales[0]}
            icon="pi pi-minus"
            onClick={decrementScale}
            rounded
            text
            type="button"
          />
          <div className="flex gap-2 align-items-center">
            {scales.map((s) => {
              return (
                <i
                  className={classNames("pi pi-circle-fill text-300", {
                    "text-primary-500": s === layoutConfig.scale,
                  })}
                  key={nanoid()}
                />
              );
            })}
          </div>
          <Button
            className="w-2rem h-2rem ml-2"
            disabled={layoutConfig.scale === scales[scales.length - 1]}
            icon="pi pi-plus"
            onClick={incrementScale}
            rounded
            text
            type="button"
          />
        </div>
        <h5>Scenes</h5>
        <div className="flex flex-wrap p-2 surface-100 gap-2 border-round-lg">
          {scenes.map((scene) => {
            return (
              <Button
                className="bg-transparent border-none relative p-0"
                key={scene.id}
                onClick={() => {
                  changeScene(scene);
                }}
                style={{flex: "0 0 48%"}}
                tooltip={scene.sceneName}
                tooltipOptions={{position: "top"}}
              >
                {selectedScene?.sceneName === scene.sceneName && (
                  <div
                    className="absolute w-full h-full flex justify-content-center align-items-center"
                    style={{
                      background: "rgba(255, 255, 255, 0.85)",
                      backdropFilter: "blur(3.56688px)",
                    }}
                  >
                    <svg
                      fill="none"
                      height="26"
                      viewBox="0 0 25 26"
                      width="25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        fill={scene.componentThemeColor}
                        height="24.4586"
                        rx="12.2293"
                        width="24.4586"
                        x="0.520691"
                        y="0.770691"
                      />
                      <g clipPath="url(#clip0_1_16289)">
                        <path
                          d="M11.1158 16.5119C11.0587 16.51 11.0025 16.4964 10.9507 16.472C10.899 16.4476 10.8528 16.4129 10.8149 16.37L7.97597 13.531C7.92185 13.4959 7.8764 13.449 7.84306 13.3938C7.80973 13.3385 7.78938 13.2765 7.78354 13.2122C7.77771 13.148 7.78655 13.0832 7.8094 13.0229C7.83224 12.9626 7.8685 12.9082 7.91542 12.864C7.96234 12.8197 8.01871 12.7867 8.08027 12.7674C8.14183 12.7481 8.20696 12.743 8.27076 12.7526C8.33456 12.7621 8.39535 12.7861 8.44854 12.8226C8.50174 12.8591 8.54595 12.9072 8.57783 12.9632L11.1158 15.4842L17.0606 9.55651C17.1406 9.50462 17.2358 9.4811 17.3308 9.48972C17.4258 9.49834 17.5151 9.53861 17.5845 9.60406C17.6539 9.66952 17.6993 9.75637 17.7134 9.8507C17.7275 9.94503 17.7096 10.0414 17.6625 10.1243L11.4168 16.37C11.3789 16.4129 11.3327 16.4476 11.281 16.472C11.2292 16.4964 11.173 16.51 11.1158 16.5119Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_16289">
                          <rect
                            fill="white"
                            height="10.7006"
                            transform="translate(7.39966 7.64966)"
                            width="10.7006"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                )}
                <svg
                  fill="none"
                  height="44.5"
                  viewBox="0 0 110 56"
                  width="110"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_23714)">
                    <rect
                      fill={scene.colorSchemeColor}
                      height="56"
                      rx="6"
                      width="109.5"
                      x="0.5"
                    />
                    <rect
                      fill={scene.topbarThemeColor}
                      height="10.5"
                      transform="translate(0.5)"
                      width="109.5"
                    />
                    <rect
                      fill={scene.menuThemeColor}
                      height="45.5"
                      transform="translate(0.5 10.5)"
                      width="42"
                    />
                    <rect
                      fill={scene.componentThemeColor}
                      height="3.5"
                      rx="1.75"
                      width="21"
                      x="11"
                      y="24.5"
                    />
                    <rect
                      fill={scene.componentThemeColor}
                      height="3.5"
                      rx="1.75"
                      width="21"
                      x="11"
                      y="31.5"
                    />
                    <rect
                      fill={scene.componentThemeColor}
                      height="3.5"
                      rx="1.75"
                      width="21"
                      x="11"
                      y="38.5"
                    />
                    <rect
                      fill={scene.cardColor}
                      height="24.5"
                      rx="3"
                      width="46.5"
                      x="53"
                      y="21"
                    />
                    <rect
                      fill={scene.componentThemeColor}
                      height="10.5"
                      rx="3"
                      width="32.5"
                      x="60"
                      y="28"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_23714">
                      <rect
                        fill="white"
                        height="56"
                        rx="6"
                        width="109.5"
                        x="0.5"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Button>
            );
          })}
        </div>
        <h6>Color Scheme</h6>
        <div className="flex">
          <div className="flex align-items-center">
            <RadioButton
              checked={layoutConfig.colorScheme === "light"}
              id="light"
              name="darkMenu"
              onChange={(e) => {
                changeColorScheme(e.value);
              }}
              value="light"
            />
            <label className="ml-2" htmlFor="light">
              Light
            </label>
          </div>
          <div className="flex align-items-center ml-4">
            <RadioButton
              checked={layoutConfig.colorScheme === "dark"}
              id="dark"
              name="darkMenu"
              onChange={(e) => {
                changeColorScheme(e.value);
              }}
              value="dark"
            />
            <label className="ml-2" htmlFor="dark">
              Dark
            </label>
          </div>
        </div>

        {!props.minimal && (
          <>
            <h5>Menu Mode</h5>
            <div className="flex flex-wrap row-gap-3">
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  checked={layoutConfig.menuMode === "static"}
                  inputId="mode1"
                  name="menuMode"
                  onChange={(e) => {
                    changeMenuMode(e);
                  }}
                  value="static"
                />
                <label htmlFor="mode1">Static</label>
              </div>
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  checked={layoutConfig.menuMode === "overlay"}
                  inputId="mode2"
                  name="menuMode"
                  onChange={(e) => {
                    changeMenuMode(e);
                  }}
                  value="overlay"
                />
                <label htmlFor="mode2">Overlay</label>
              </div>
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  checked={layoutConfig.menuMode === "slim"}
                  inputId="mode3"
                  name="menuMode"
                  onChange={(e) => {
                    changeMenuMode(e);
                  }}
                  value="slim"
                />
                <label htmlFor="mode3">Slim</label>
              </div>
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  checked={layoutConfig.menuMode === "slim-plus"}
                  inputId="mode4"
                  name="menuMode"
                  onChange={(e) => {
                    changeMenuMode(e);
                  }}
                  value="slim-plus"
                />
                <label htmlFor="mode4">Slim +</label>
              </div>
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  checked={layoutConfig.menuMode === "drawer"}
                  inputId="mode7"
                  name="menuMode"
                  onChange={(e) => {
                    changeMenuMode(e);
                  }}
                  value="drawer"
                />
                <label htmlFor="mode7">Drawer</label>
              </div>
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  checked={layoutConfig.menuMode === "reveal"}
                  inputId="mode5"
                  name="menuMode"
                  onChange={(e) => {
                    changeMenuMode(e);
                  }}
                  value="reveal"
                />
                <label htmlFor="mode6">Reveal</label>
              </div>
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  checked={layoutConfig.menuMode === "horizontal"}
                  inputId="mode5"
                  name="menuMode"
                  onChange={(e) => {
                    changeMenuMode(e);
                  }}
                  value="horizontal"
                />
                <label htmlFor="mode5">Horizontal</label>
              </div>
            </div>
            <h5>Menu Profile Position</h5>
            <div className="flex">
              <div className="flex align-items-center">
                <RadioButton
                  checked={layoutConfig.menuProfilePosition === "start"}
                  id="start"
                  name="position"
                  onChange={onInlineMenuPositionChange}
                  value="start"
                />
                <label className="ml-2" htmlFor="start">
                  Start
                </label>
              </div>
              <div className="flex align-items-center ml-4">
                <RadioButton
                  checked={layoutConfig.menuProfilePosition === "end"}
                  id="end"
                  name="position"
                  onChange={onInlineMenuPositionChange}
                  value="end"
                />
                <label className="ml-2" htmlFor="end">
                  End
                </label>
              </div>
            </div>

            <h5>Input Style</h5>
            <div className="flex">
              <div className="field-radiobutton flex-1">
                <RadioButton
                  checked={layoutConfig.inputStyle === "outlined"}
                  inputId="outlined_input"
                  name="inputStyle"
                  onChange={(e) => {
                    changeInputStyle(e);
                  }}
                  value="outlined"
                />
                <label htmlFor="outlined_input">Outlined</label>
              </div>
              <div className="field-radiobutton flex-1">
                <RadioButton
                  checked={layoutConfig.inputStyle === "filled"}
                  inputId="filled_input"
                  name="inputStyle"
                  onChange={(e) => {
                    changeInputStyle(e);
                  }}
                  value="filled"
                />
                <label htmlFor="filled_input">Filled</label>
              </div>
            </div>
          </>
        )}
        <h5>Ripple Effect</h5>
        <InputSwitch checked={layoutConfig.ripple} onChange={changeRipple} />

        {!props.minimal && (
          <>
            <h5>Menu Themes</h5>
            {layoutConfig.colorScheme !== "dark" ? (
              <div className="flex flex-wrap row-gap-3">
                {menuThemes.map((t, i) => {
                  return (
                    <div className="w-3" key={nanoid()}>
                      <div
                        className="layout-config-color-option"
                        onClick={() => {
                          onChangeMenuTheme(t.name);
                        }}
                        style={{cursor: "pointer"}}
                        title={t.name}
                      >
                        <button
                          className="cursor-pointer p-link w-2rem h-2rem border-round shadow-2 flex-shrink-0 flex justify-content-center align-items-center border-circle"
                          style={{backgroundColor: t.color}}
                          type="button"
                        >
                          {layoutConfig.menuTheme === t.name && (
                            <span className="check flex align-items-center justify-content-center">
                              <i
                                className={`pi pi-check ${
                                  t.name === layoutConfig.menuTheme &&
                                  layoutConfig.menuTheme !== "light"
                                    ? "text-white"
                                    : "text-dark"
                                }`}
                              />
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>
                Menu themes are only available in light mode by design as large
                surfaces can emit too much brightness in dark mode.
              </p>
            )}

            <h5>Topbar Themes</h5>
            <div className="flex flex-wrap row-gap-3">
              {topbarThemes.map((t) => {
                return (
                  <div className="w-3" key={nanoid()}>
                    <div
                      className="layout-config-color-option p-link"
                      onClick={() => {
                        onTopbarChangeTheme(t.name);
                      }}
                      style={{cursor: "pointer"}}
                      title={t.name}
                    >
                      <button
                        className="cursor-pointer p-link w-2rem h-2rem border-round shadow-2 flex-shrink-0 flex justify-content-center align-items-center border-circle"
                        style={{backgroundColor: t.color}}
                        type="button"
                      >
                        {layoutConfig.topbarTheme === t.name && (
                          <span className="check flex align-items-center justify-content-center">
                            <i
                              className={`pi pi-check ${
                                t.name === layoutConfig.topbarTheme &&
                                layoutConfig.topbarTheme !== "light"
                                  ? "text-white"
                                  : "text-dark"
                              }`}
                            />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <h5>Component Themes</h5>
        <div className="flex flex-wrap row-gap-3">
          {componentThemes.map((t) => {
            return (
              <div className="w-3" key={nanoid()}>
                <div
                  className="layout-config-color-option p-link"
                  onClick={() => {
                    _changeTheme(t.name);
                  }}
                  style={{cursor: "pointer"}}
                  title={t.name}
                >
                  <button
                    className="cursor-pointer p-link w-2rem h-2rem border-round shadow-2 flex-shrink-0 flex justify-content-center align-items-center border-circle"
                    style={{backgroundColor: t.color}}
                    type="button"
                  >
                    {layoutConfig.componentTheme === t.name && (
                      <span className="check flex align-items-center justify-content-center">
                        <i className="pi pi-check text-white" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Sidebar>
    </>
  );
}

export default AppConfig;
