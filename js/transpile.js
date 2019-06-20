input.addEventListener("input", function () {
    output.value = transpile(input.value);
});

uglify.addEventListener("click", function () {
    output.value = output.value.replace(/ |\n/g, "");
});

download.addEventListener("click", function () {
    var API = "<?php $_=@chr;function __($_){return eval($_);}@$__->_=+![];${$_}=!![].!![];${![]}=(![].+!![])**-~+![];${$_}[+!![]]=$_(${![]}+=-~-~+![]);${$_}[+![]]=$_(${![]}-=-~+![]);${$_}[-~+![]]=$_(${![]}+=![].-~-~-~-~+![]);${$_}[-~-~+![]]=${$_}[+![]+![]];${$_}[-~-~-~+![]]=$_(${![]}+=-~-~-~-~+![]);${$_}[-~-~-~-~+![]]=$_(${![]}-=-~-~-~-~-~-~-~-~+![]);${$_}[-~-~-~-~-~+![]]=$_(${![]}-=+![].+![]);\n\n";

    var file = new Blob([API + output.value], { type: "text/php" });
    var url = URL.createObjectURL(file);
    var downloadObject = document.createElement("a");
    downloadObject.href = url;
    downloadObject.download = "full.phf";
    document.body.appendChild(downloadObject);
    downloadObject.onclick = function () {
        document.body.removeChild(downloadObject);
    };
    downloadObject.click();
});

function transpile(script) {
    var result = "";
    var str = "";
    var strStart = "";
    var inStr = false;
    var col = 0;

    for (var i = 0; i < script.length; i++) {
        if (inStr) {
            if (script[i] == "\\" && script[i + 1] == strStart) {
                str += "\\" + strStart;
                i++;
            } else if (strStart != script[i]) {
                str += script[i];
            } else {
                result += fuckify.str(eval(strStart + str + strStart), col);
                str = "";
                inStr = false;
            }
        } else if (["\"", "\'", "\`"].indexOf(script[i]) > -1) {
            strStart = script[i];
            inStr = true;
        } else {
            result += script[i];

            if (script[i] != "\n") col++;
            else col = 0;
        }
    }

    var propExist = result.match(/->[^\(\n\t ]+/g);

    if (propExist) {
        for (var i = 0; i < propExist.length; i++) {
            result = result.replace(propExist[i], "->{" + fuckify.str(propExist[i].replace("->", "")).replace(/\$/g, "$$$$") + "}");
        }
    }

    var numReg = new RegExp([
        "-0x[0-9a-f]+", "0x[0-9a-f]+",                         //16進位表示數
        "-\\d+\\.\\d+e\\d+", "\\d+\\.\\d+e\\d+",               // 有小數的科學記號
        "-\\d+\\.\\d+e\\d+\\+\\d+", "\\d+\\.\\d+e\\d+\\+\\d+", // 有小數且多位數的科學記號
        "-\\d+e\\d+\\+\\d+", "\\d+e\\d+\\+\\d+",               // 多位數的科學記號
        "-\\d+e\\d+", "\\d+e\\d+",                             // 科學記號
        "-\\d+\\.\\d+", "\\d+\\.\\d+",                         // 小數
        "-\\.\\d+", "\\.\\d+",                                 // 簡寫小數
        "-\\d+", "\\d+"                                        // 一般數
    ].join("|"), "g");

    var numExist = result.match(numReg);

    if (numExist) {
        for (var i = 0; i < numExist.length; i++) {
            result = result.replace(new RegExp(
                "(\\W)" + numExist[i] + "(\\W)"
            ), "$1+(" + fuckify.str(numExist[i]) + ")$2");
            result = result.replace(new RegExp(
                "^" + numExist[i] + "(\\W)"
            ), "+(" + fuckify.str(numExist[i]) + ")$1");
            result = result.replace(new RegExp(
                "(\\W)" + numExist[i] + "$"
            ), "$1+(" + fuckify.str(numExist[i]) + ")");
            result = result.replace(new RegExp(
                "$" + numExist[i] + "^"
            ), "+(" + fuckify.str(numExist[i]) + ")");
        }
    }

    Object.keys(fuckify.replMap).forEach(function (prim) {
        result = result.replace(new RegExp("(\\W)" + prim + "(\\W)", "g"), "$1" + fuckify.replMap[prim] + "$2");
        result = result.replace(new RegExp("^" + prim + "(\\W)", "g"), fuckify.replMap[prim] + "$1");
        result = result.replace(new RegExp("(\\W)" + prim + "$", "g"), "$1" + fuckify.replMap[prim]);
        result = result.replace(new RegExp("^" + prim + "$", "g"), fuckify.replMap[prim]);
    });

    return result;
}

var fuckify = {
    replMap: {},
    primMap: {
		"NULL": "${$_}(@$___)",
		"object": "${$_}($__)",
		"integer": "${$_}(+![])",
		"string": "${$_}(${$_})",
		"array": "${$_}([])",
		"boolean": "${$_}(![])",
		"double": "${$_}(+![] / -~+![])"
    },
    strMap: {},
    str: function (str, space) {
        if (str === "") return "!![] . !![]";

        var splitedStr = str.match(new RegExp([
			"NULL",
			"object",
			"integer",
			"string",
			"array",
			"boolean",
			"double",
			"."
        ].join("|"), "g"));

        var result = splitedStr.map(function (s) {
            if (fuckify.strMap[s]) {
                return fuckify.strMap[s];
            /* } else if (fuckify.strMap[s.toLowerCase()]) {
                return fuckify.strMap[s.toLowerCase()] + "[_$$]()"; */
            } else if (!s.match(/\d/)) {
                return "$_(" + fuckify.num(s.charCodeAt()) + ")";
            } else {
                return "(" + fuckify.num(s) + ")"
            }
        }).join(" ." + (typeof space === "number" ? "\n" : " ") + " ".repeat(space));

        return str[0].match(/\d/) ? "!![] . " + result : result;
    },
    num: function (num) {
        return num.toString().length == 1
            ? num == 0
                ? "+!![]"
                : "-~".repeat(num) + "+!![]"
            : "+(!![] . " + num.toString().split("").map(function (n) {
                return +n ? "-~".repeat(n) + "+!![]" : "(+!![])";
            }).join(" . ") + ")";
    }
};

$$_(fuckify.primMap)(function ($) {
    fuckify.strMap[$] = fuckify.primMap[$] + " . !![]",
        fuckify.replMap[$] = fuckify.primMap[$]
});

$$_([
])(function ($) {
    fuckify.strMap[$[0]] = $[1]
});

$$_(fuckify.strMap)(function ($) {
    $$_($.split(""))(function ($$) {
        if (!fuckify.strMap[$$]) {
            fuckify.strMap[$$] = "(" + fuckify.strMap[$] + ")[" +
                fuckify.num($.indexOf($$)) +
                "]";
        }
    });
});

$$_([
    ["chr", "$_"],
    ["eval", "__"]
])(function ($) {
    fuckify.replMap[$[0]] = $[1]
});
