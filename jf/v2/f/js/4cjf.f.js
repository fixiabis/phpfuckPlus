_ = {};
__ = /\\/;
___ = [];
____ = () => { };
_____ = _$_;

(($, $$) => {
    $[0] = ($$, $$$) => ( // convert to char
        (() => {
            !$[1] && ($[4] = 0);
            $[4] += $[5][$[1]++] * $$;
        })(),
        $[1] == 4 ? (
            $[1] = 0,
            $[2] += __$($[4]),
            $[2]
        ) : $$$
    );

    $[3] = $$ => (
        (() => (
            ($$ == _) && ($$ = $__($[2])), $[2] = ""
        ))(),
        $$
    );

    $[5] = [4096, 256, 16, 1];

    $[4] = 0;  // char
    $[2] = ""; // text
    $[1] = 0;  // length

    $$(_, {
        [_]: {
            ["get"]: () => $[0](0, _)
        },
        [__]: {
            ["get"]: () => $[0](1, _)
        },
        [___]: {
            ["get"]: () => $[0](2, _)
        },
        [____]: {
            ["get"]: () => $[0](3, _)
        },
        [_____]: {
            ["get"]: () => $[3](_)
        }
    });

    $$(__, {
        [_]: {
            ["get"]: () => $[0](4, _)
        },
        [__]: {
            ["get"]: () => $[0](5, _)
        },
        [___]: {
            ["get"]: () => $[0](6, _)
        },
        [____]: {
            ["get"]: () => $[0](7, _)
        },
        [_____]: {
            ["get"]: () => $[3](__)
        }
    });

    $$(___, {
        [_]: {
            ["get"]: () => $[0](8, _)
        },
        [__]: {
            ["get"]: () => $[0](9, _)
        },
        [___]: {
            ["get"]: () => $[0](10, _)
        },
        [____]: {
            ["get"]: () => $[0](11, _)
        },
        [_____]: {
            ["get"]: () => $[3](___)
        }
    });

    $$(____, {
        [_]: {
            ["get"]: () => $[0](12, _)
        },
        [__]: {
            ["get"]: () => $[0](13, _)
        },
        [___]: {
            ["get"]: () => $[0](14, _)
        },
        [____]: {
            ["get"]: () => $[0](15, _)
        },
        [_____]: {
            ["get"]: () => $[3](____)
        }
    });
})({}, Object.defineProperties);
