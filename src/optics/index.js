/* eslint-disable @typescript-eslint/explicit-function-return-type */
import produce from 'immer';
import { createSelector } from 'reselect';

export function lens() {
  return (focus, valueType = 0, subFocus = undefined) => ({
    focus,
    valueType,
    subFocus,
    view: (s, param) => {
      switch (valueType) {
        case 0: {
          const result = s[focus];

          return s ? result : undefined;
        }
        case 1: {
          if (s === undefined) return undefined;

          const arr = s[focus];

          if (subFocus === undefined) return arr;

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          const result = [];

          let key = it.next();

          while (!key.done) {
            result[key.value] = arr[key.value];
            key = it.next();
          }

          return result;
        }
        case 2: {
          if (s === undefined) return undefined;

          if (subFocus === undefined) return s[focus];

          const obj = s[focus];

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          const result = {};

          let key = it.next();

          while (!key.done) {
            result[key.value] = obj[key.value];
            key = it.next();
          }

          return result;
        }
        default:
          return undefined;
      }
    },
    viewOver: (s, f, param) => {
      switch (valueType) {
        case 0: {
          f(s[focus]);
          break;
        }
        case 1: {
          const arr = s[focus];

          if (subFocus === undefined) {
            arr.map((el) => f(el));
            break;
          }

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          let key = it.next();
          while (!key.done) {
            f(arr[key.value]);
            key = it.next();
          }

          break;
        }
        case 2: {
          const obj = s[focus];

          if (subFocus === undefined) {
            Object.values(obj).forEach((value) => {
              f(value);
            });
            break;
          }

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          let key = it.next();
          while (!key.done) {
            f(obj[key.value]);
            key = it.next();
          }
          break;
        }
        default:
          break;
      }
    },
    set: (s, v, param) => {
      if (s === undefined) return s;

      switch (valueType) {
        case 0: {
          return { ...s, [focus]: v };
        }
        case 1: {
          if (subFocus === undefined) {
            return { ...s, [focus]: v };
          }

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          let arr = s[focus];

          arr = produce(arr, (arrDraft) => {
            const arrDraftC = arrDraft;
            let key = it.next();

            while (!key.done) {
              arrDraftC[key.value] = v[key.value];
              key = it.next();
            }
          });
          return { ...s, [focus]: arr };
        }
        case 2: {
          if (subFocus === undefined) {
            return { ...s, [focus]: v };
          }

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          let obj = s[focus];

          obj = produce(obj, (objDraft) => {
            const objDraftC = objDraft;
            let key = it.next();

            while (!key.done) {
              objDraftC[key.value] = v[key.value];
              key = it.next();
            }
          });
          return { ...s, [focus]: obj };
        }
        default:
          return undefined;
      }
    },
    setTransient: (s, v, param) => {
      if (s === undefined) return s;

      switch (valueType) {
        case 0: {
          const tempS = s;
          tempS[focus] = v;
          return tempS;
        }
        case 1: {
          if (subFocus === undefined) {
            const tempS = s;
            tempS[focus] = v;
            return tempS;
          }

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          const arr = s[focus];

          let key = it.next();

          while (!key.done) {
            arr[key.value] = v[key.value];
            key = it.next();
          }
          return s;
        }
        case 2: {
          if (subFocus === undefined) {
            const tempS = s;
            tempS[focus] = v;
            return tempS;
          }

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          const obj = s[focus];

          let key = it.next();

          while (!key.done) {
            obj[key.value] = v[key.value];
            key = it.next();
          }
          return s;
        }
        default:
          return undefined;
      }
    },
    setOver: (s, f, param) => {
      if (s === undefined) return s;

      switch (valueType) {
        case 0: {
          return {
            ...s,
            [focus]: f(s[focus]),
          };
        }
        case 1: {
          const arr = s[focus];
          if (subFocus === undefined) {
            return {
              ...s,
              [focus]: arr.map((el) => f(el)),
            };
          }

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          return {
            ...s,
            [focus]: produce(arr, (arrDraft) => {
              let key = it.next();
              const tempArrDraft = arrDraft;

              while (!key.done) {
                tempArrDraft[key.value] = f(arrDraft[key.value]);
                key = it.next();
              }
            }),
          };
        }
        case 2: {
          let obj = s[focus];
          if (subFocus === undefined) {
            return {
              ...s,
              [focus]: Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key, f(value)])
              ),
            };
          }

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          obj = produce(obj, (objDraft) => {
            const objDraftC = objDraft;
            let key = it.next();

            while (!key.done) {
              objDraftC[key.value] = f(obj[key.value]);
              key = it.next();
            }
          });
          return { ...s, [focus]: obj };
        }
        default:
          return undefined;
      }
    },
    setOverTransient: (s, f, param) => {
      if (s === undefined) return s;

      switch (valueType) {
        case 0: {
          const tempS = s;
          tempS[focus] = f(s[focus]);
          return tempS;
        }
        case 1: {
          const arr = s[focus];
          if (subFocus === undefined) {
            const tempS = s;
            tempS[focus] = arr.map((el) => f(el));
            return tempS;
          }

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          let key = it.next();

          while (!key.done) {
            arr[key.value] = f(arr[key.value]);
            key = it.next();
          }
          return s;
        }
        case 2: {
          const obj = s[focus];
          if (subFocus === undefined) {
            const tempS = s;
            tempS[focus] = Object.fromEntries(
              Object.entries(obj).map(([key, value]) => [key, f(value)])
            );
            return tempS;
          }

          let it;

          if (param === undefined) it = subFocus();
          else it = subFocus(param);

          let key = it.next();

          while (!key.done) {
            obj[key.value] = f(obj[key.value]);
            key = it.next();
          }
          return s;
        }
        default:
          return undefined;
      }
    },
  });
}

function getVw(vtarr) {
  const vws = vtarr.map((vt) => {
    if (Array.isArray(vt)) {
      return getVw(vt);
    }
    switch (vt) {
      case 0: // ValueType.Simple
      default:
        return (v) => v;
      case 1: // ValueType.Array
        return (v) => (trgt, lns, param) => {
          return trgt.map((value) => v(value, lns, param));
        };
      case 2: // ValueType.AssociativeArray
        return (v) => (trgt, lns, param) => {
          return Object.fromEntries(
            Object.entries(trgt).map(([key, value]) => [
              key,
              v(value, lns, param),
            ])
          );
        };
    }
  });

  return (v) => (trgt, lns, param) => {
    return trgt.map((value, i) => vws[i](v)(value, lns, param));
  };
}

function getSt(vtarr) {
  const vws = vtarr.map((vt, k) => {
    if (Array.isArray(vt)) {
      return getSt(vt);
    }
    switch (vt) {
      case 0: // ValueType.Simple
      default:
        return (appLns) => appLns;
      case 1: // ValueType.Array
        return (appLns) => (trgt, lns, val, param) => {
          trgt.forEach((value, j) => appLns(value, lns, val[k][j], param));
        };

      case 2: // ValueType.AssociativeArray
        return (appLns) => (trgt, lns, val, param) => {
          Object.entries(trgt).forEach(([j, value]) => {
            appLns(value, lns, val[k][j], param);
          });
        };
    }
  });

  return (v) => (trgt, lns, param) => {
    return trgt.map((value, i) => vws[i](v)(value, lns, param));
  };
}

export function telescope(...args) {
  const applyViewBase = (t, lns, param) => {
    return lns.view(t, param);
  };

  const views = [];

  for (let i = args.length - 2; i >= 0; i -= 1) {
    let applyView = applyViewBase;

    for (let j = i; j >= 0; j -= 1) {
      if (Array.isArray(args[j].valueType)) {
        applyView = getVw(args[j].valueType)(applyView);
      } else {
        switch (args[j].valueType) {
          case 1: // ValueType.Array
            applyView = ((v) => (trgt, lns, param) => {
              return trgt.map((value) => v(value, lns, param));
            })(applyView);
            break;
          case 2: // ValueType.AssociativeArray
            applyView = ((v) => (trgt, lns, param) => {
              return Object.fromEntries(
                Object.entries(trgt).map(([key, value]) => [
                  key,
                  v(value, lns, param),
                ])
              );
            })(applyView);
            break;
          default:
            break;
        }
      }
    }
    views.unshift(
      ((k, appV) => (t, param) => appV(t, args[k], param))(i + 1, applyView)
    );
  }
  views.unshift((t, param) => applyViewBase(t, args[0], param));

  const applySetBase = (t, lns, v, param) => {
    return lns.setTransient(t, v, param);
  };

  let applySet = applySetBase;

  for (let i = args.length - 2; i >= 0; i -= 1) {
    if (Array.isArray(args[i].valueType)) {
      applySet = getSt(args[i].valueType)(applySet);
    } else {
      switch (args[i].valueType) {
        case 1: // ValueType.Array
          applySet = ((appLns) => (trgt, lns, val, param) => {
            trgt.forEach((value, j) => {
              appLns(value, lns, val[j], param);
            });
          })(applySet);
          break;
        case 2: // ValueType.AssociativeArray
          applySet = ((appLns) => (trgt, lns, val, param) => {
            Object.entries(trgt).forEach(([key, value]) => {
              appLns(value, lns, val[key], param);
            });
          })(applySet);
          break;
        default:
          break;
      }
    }
  }

  return {
    focus: args[0].focus,
    valueType: args[0].valueType,
    subFocus: undefined,
    view: (s, param) => {
      return views.reduce((target, v) => {
        return v(target, param);
      }, s);
    },
    viewOver: (s, f, param) => {
      const viewOver = args.reduceRight((currentViewOver, lns) => {
        if (Array.isArray(lns.valueType)) {
          return (trgt) =>
            lns.viewOver(
              trgt,
              lns.valueType.map(() => currentViewOver),
              param
            );
        }

        return (trgt) => lns.viewOver(trgt, currentViewOver, param);
      }, f);

      viewOver(s);
    },
    set: (s, v, param) => {
      return produce(s, (draftS) => {
        let focusedTrgt = draftS;

        for (let i = 0; i < args.length - 1; i += 1) {
          focusedTrgt = views[i](focusedTrgt, param);
        }
        applySet(focusedTrgt, args[args.length - 1], v, param);
      });
    },
    setTransient: (s, v, param) => {
      let focusedTrgt = s;

      for (let i = 0; i < args.length - 1; i += 1) {
        focusedTrgt = views[i](focusedTrgt, param);
      }
      applySet(focusedTrgt, args[args.length - 1], v, param);

      return s;
    },
    setOver: (s, f, param) => {
      const setOver = args.reduceRight((currentSetOver, lns) => {
        if (Array.isArray(lns.valueType)) {
          return (trgt) =>
            lns.setOverTransient(
              trgt,
              lns.valueType.map(() => currentSetOver),
              param
            );
        }

        return (trgt) => lns.setOverTransient(trgt, currentSetOver, param);
      }, f);

      return produce(s, (draftS) => setOver(draftS));
    },
    setOverTransient: (s, f, param) => {
      const setOver = args.reduceRight((currentSetOver, lns) => {
        if (Array.isArray(lns.valueType)) {
          return (trgt) =>
            lns.setOverTransient(
              trgt,
              lns.valueType.map(() => currentSetOver),
              param
            );
        }

        return (trgt) => lns.setOverTransient(trgt, currentSetOver, param);
      }, f);

      setOver(s);

      return s;
    },
  };
}

export function array(...args) {
  return {
    focus: args.map((arg) => arg.focus),
    valueType: args.map((arg) => arg.valueType),
    view: (s, param) => args.map((arg) => arg.view(s, param)),
    viewOver: (s, f, param) => {
      args.forEach((arg, i) => arg.viewOver(s, f[i], param));
    },
    set: (s, v, param) =>
      produce(s, (draftS) => {
        args.forEach((arg, i) => {
          arg.setTransient(draftS, v[i], param);
        });
      }),
    setTransient: (s, v, param) => {
      args.forEach((arg, i) => {
        arg.setTransient(s, v[i], param);
      });
    },
    setOver: (s, f, param) =>
      produce(s, (draftS) => {
        args.forEach((arg, i) => {
          arg.setOverTransient(draftS, f[i], param);
        });
      }),
    setOverTransient: (s, f, param) => {
      args.forEach((arg, i) => {
        arg.setOverTransient(s, f[i], param);
      });
    },
  };
}

export function fiber(l, r, c) {
  return { lens: l, rule: r, condition: c };
}

export function opticalReducer(...args) {
  const lenses = args.map((val) => val.lens);

  const lensArray = array(...lenses);

  return (s) => {
    const functions = args.map((val) => (v) =>
      val.condition && !val.condition(s, v) ? v : val.rule(s, v)
    );

    return lensArray.setOver(s, functions, s);
  };
}

export function rule(...args) {
  if (args.length === 1) {
    return (s, v) => args[0](v);
  }

  if (args[0].length === args[1].length)
    return (s) => args[1](...args[0].map((g) => g(s, s)));

  return (s, v) => args[1](...args[0].map((g) => g(s, s)), v);
}

export function condition(...args) {
  return rule(...args);
}

export function actionReducer(actionID, reducer) {
  return {
    [actionID]: (state, action) =>
      reducer({ actionPayload: action.payload, state }),
  };
}

export function inState(l) {
  return telescope(lens()('state'), l);
}

export function inPayload(l) {
  return telescope(lens()('payload'), l);
}

export function selector(...args) {
  return createSelector(
    args[0].map((g) => (s) => g(s, s)),
    args[1]
  );
}

export function acitonReducer(actionID, reducer) {
  return {
    [actionID]: (state, action) => {
      return reducer({ state, payload: action.payload }).state;
    },
  };
}
