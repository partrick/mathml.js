// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// mouseover
function mathmlMouseover(e) {
    this.setAttribute('style', 'background-color:' + MATHMLJS.COLOR + ';');
    e.stopPropagation();
    e.preventDefault()
}

// mouseout
function mathmlMouseout(e) {
    this.removeAttribute('style');
}

// Setup all mouseover
function setMouseover(elem) {
    elem.addEventListener('mouseover', mathmlMouseover, false);
    elem.addEventListener('mouseout', mathmlMouseout, false);
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Parse element and set informations

function setTokenType(elem) {
    var tl = null;  // Will store token level
    switch (elem.nodeName.toLowerCase()) {
        case 'mi':
            t = 0;
            break;
        case 'mn':
            t = 0;
            break;
        case 'mrwo':
            t = 1;
            break;
        case 'mfenced':
            t = 1;
            break;
    }
}
// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Rules for assumptios required

// mi element
function assum_mi(elem) {
    var n = elem.nextElementSibling;
    var r;
    if (n) {
        switch (n.nodeName.toLowerCase()) {
            case 'mo':
                var sn = n.innerHTML.trim();
                var charcode = sn.charCodeAt(0);
                switch (charcode) {
                    case 8289:  // Function Aplication
                        r = 1;
                        break;
                    case 8290:  // Invisible times
                        r = 2;
                        break;
                    case 8291:  // Invisible separator
                        r = 3;
                        break;
                    default:
                        r = 0;
                        break;
                }
                break;
            default:
                r = 0;
                break;
        }
    }
    else {
        // No next sibling
        r = 0;
    }
    return r;
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function opPlusMiMi(elem) {
    var r;
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    if (p.innerHTML.trim() === n.innerHTML.trim()) {
        // Create node to replace
        var new_elem = mathmlCreateNode('mrow', '');

        var mn = mathmlCreateNode('mn', 2)
        new_elem.appendChild(mn);

        var mo = mathmlCreateNode('mo', '\u2062');
        new_elem.appendChild(mo);

        var mi = mathmlCreateNode('mi', p.innerHTML);
        new_elem.appendChild(mi);

        // Replace node and remove old ones
        jQuery(p).replaceWith(new_elem);
        n.remove();
        elem.remove();

        r = 1;
    }
    else {
        r = 0;
    }

    return r;
}

function opPlusMnMn(elem) {
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    var val = Number(p.innerHTML) + Number(n.innerHTML);
    if (val >= 0) {
        // Create node to replace
        var new_elem = mathmlCreateNode('mn', val);
    }
    else
        var new_elem = restoreNegativeMn(val);

    // Replace node and remove old ones
    jQuery(p).replaceWith(new_elem);
    n.remove();
    elem.remove();

    return 1;
}

function opPlusMrowMrow(elem) {
}

// Handle the click in a plus sign
function opPlus(elem) {
    var r;
    var h = opSiblingHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opPlusMiMi(elem);
            break;
        case 2:
            r = opPlusMnMn(elem);
            break;
        case 3:
            r = opPlusMrowMrow(elem);
            break;
    }
    return r;
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function opMinusMiMi(elem) {
    var r;
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    if (p.innerHTML.trim() === n.innerHTML.trim()) {
        // Create node to replace
        var new_elem = mathmlCreateNode('mn', 0);

        // Replace node and remove old ones
        jQuery(p).replaceWith(new_elem);
        n.remove();
        elem.remove();

        r = 1;
    }
    else {
        r = 0;
    }

    return r;
}

function opMinusMnMn(elem) {
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    var val = Number(p.innerHTML) - Number(n.innerHTML);
    if (val >= 0) {
        // Create node to replace
        var new_elem = mathmlCreateNode('mn', val);
    }
    else
        var new_elem = restoreNegativeMn(val);

    // Replace node and remove old ones
    jQuery(p).replaceWith(new_elem);
    n.remove();
    elem.remove();

    return 1;
}

function opMinusMrowMrow(elem) {
}

// Handle the click in a plus sign
function opMinus(elem) {
    var r;
    var h = opSiblingHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opMinusMiMi(elem);
            break;
        case 2:
            r = opMinusMnMn(elem);
            break;
        case 3:
            r = opMinusMrowMrow(elem);
            break;
    }
    return r;
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function opTimesMiMi(elem) {
    var r;
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    if (p.innerHTML.trim() === n.innerHTML.trim()) {
        // Create node to replace
        var new_elem = mathmlCreateNode('msup', '');

        var mi = mathmlCreateNode('mi', p.innerHTML);
        new_elem.appendChild(mi);

        var mn = mathmlCreateNode('mn', 2);
        new_elem.appendChild(mn);

        // Replace node and remove old ones
        jQuery(p).replaceWith(new_elem);
        n.remove();
        elem.remove();

        r = 1;
    }
    else {
        r = 0;
    }

    return r;
}

function opTimesMnMn(elem) {
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    var val = Number(p.innerHTML) * Number(n.innerHTML);
    if (val >= 0) {
        // Create node to replace
        var new_elem = mathmlCreateNode('mn', val);
    }
    else
        var new_elem = restoreNegativeMn(val);

    // Replace node and remove old ones
    jQuery(p).replaceWith(new_elem);
    n.remove();
    elem.remove();

    return 1;
}

function opTimesMrowMrow(elem) {
}

// Handle the click in a plus sign
function opTimes(elem) {
    var r;
    var h = opSiblingHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opTimesMiMi(elem);
            break;
        case 2:
            r = opTimesMnMn(elem);
            break;
        case 3:
            r = opTimesMrowMrow(elem);
            break;
    }
    return r;
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function opDivMiMi(elem) {
    var r;
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    if (p.innerHTML.trim() === n.innerHTML.trim()) {
        // Create node to replace
        var new_elem = mathmlCreateNode('mn', 1);

        // Replace node and remove old ones
        jQuery(p).replaceWith(new_elem);
        n.remove();
        elem.remove();

        r = 1;
    }
    else {
        r = 0;
    }

    return r;
}

function opDivMnMn(elem) {
    var r;
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    // We can't divide by 0
    if (Number(n.innerHTML) === 0) {
        console.log('Can\'t divide by zero.');
        r = 0;
    }
    else {
        var val = (Number(p.innerHTML) / Number(n.innerHTML)).toFixed(MATHMLJS.DECIMALS);
        if (val >= 0) {
            // Create node to replace
            var new_elem = mathmlCreateNode('mn', val);
        }
        else
            var new_elem = restoreNegativeMn(val);

        // Replace node and remove old ones
        jQuery(p).replaceWith(new_elem);
        n.remove();
        elem.remove();

        r = 1;
    }

    return r;
}

function opDivMrowMrow(elem) {
}

// Handle the click in a plus sign
function opDiv(elem) {
    var r;
    var h = opSiblingHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opDivMiMi(elem);
            break;
        case 2:
            r = opDivMnMn(elem);
            break;
        case 3:
            r = opDivMrowMrow(elem);
            break;
    }
    return r;
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function opFracMiMi(elem) {
    var r;
    var f = elem.firstElementChild;
    var l = elem.lastElementChild;

    if (f.innerHTML.trim() === l.innerHTML.trim()) {
        // Create node to replace
        var new_elem = mathmlCreateNode('mn', 1);

        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);

        r = 1;
    }
    else {
        r = 0;
    }

    return r;
}

function opFracMnMn(elem) {
    var r;
    var f = elem.firstElementChild;
    var l = elem.lastElementChild;

    // We can't divide by 0
    if (Number(l.innerHTML) === 0) {
        console.log('Can\'t divide by zero.');
        r = 0;
    }
    else {
        var val = (Number(f.innerHTML) / Number(l.innerHTML)).toFixed(MATHMLJS.DECIMALS);
        if (val >= 0) {
            // Create node to replace
            var new_elem = mathmlCreateNode('mn', val);
        }
        else
            var new_elem = restoreNegativeMn(val);

        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);

        r = 1;
    }

    return r;
}

function opFracMrowMrow(elem) {
    return 0;
}

// Handle the click in a frac element
function opFrac(elem) {
    var r;
    var h = opChildHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opFracMiMi(elem);
            break;
        case 2:
            r = opFracMnMn(elem);
            break;
        case 3:
            r = opFracMrowMrow(elem);
            break;
    }
    return r;
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function opRootMiMi(elem) {
    console.log('Can\'t compute the root of two variables.');
    return 0;
}

function opSqrtMi(elem) {
    console.log('Can\'t compute the sqrt of variable.');
    return 0;
}

function opRootMnMn(elem) {
    var r;
    var f = elem.firstElementChild;
    var l = elem.lastElementChild;

    var val = (Math.pow(Number(f.innerHTML), Number(l.innerHTML))).toFixed(MATHMLJS.DECIMALS);
    if (val >= 0) {
        // Create node to replace
        var new_elem = mathmlCreateNode('mn', val);
    }
    else
        var new_elem = restoreNegativeMn(val);

    // Replace node and remove old ones
    jQuery(elem).replaceWith(new_elem);

    return 1;
}

function opSqrtMn(elem) {
    var r;
    var f = elem.firstElementChild;

    var val = Math.sqrt(Number(f.innerHTML)).toFixed(MATHMLJS.DECIMALS);
    if (val >= 0) {
        // Create node to replace
        var new_elem = mathmlCreateNode('mn', val);
    }
    else
        var new_elem = restoreNegativeMn(val);

    // Replace node and remove old ones
    jQuery(elem).replaceWith(new_elem);

    return 1;
}

function opRootMrowMrow(elem) {
    return 0;
}

function opSqrtMrow(elem) {
    return 0;
}

// Handle the click in a sqrt element
function opSqrt(elem) {
    var r;
    var h = opChildHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opSqrtMi(elem);
            break;
        case 2:
            r = opSqrtMn(elem);
            break;
        case 3:
            r = opSqrtMrow(elem);
            break;
    }
    return r;
}

// Handle the click in a root element
function opRoot(elem) {
    var r;
    var h = opChildHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opRootMiMi(elem);
            break;
        case 2:
            r = opRootMnMn(elem);
            break;
        case 3:
            r = opRootMrowMrow(elem);
            break;
    }
    return r;
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function opPowMiMi(elem) {
    console.log('Can\'t compute the power of two variables.');
    return 0;
}

function opPowMnMn(elem) {
    var r;
    var f = elem.firstElementChild;
    var l = elem.lastElementChild;

    // TODO Probably here there is a bug. We MUST check the values.
    var val = (Math.pow(Number(f.innerHTML), Number(l.innerHTML)));
    if (val >= 0) {
        // Create node to replace
        var new_elem = mathmlCreateNode('mn', val);
    }
    else
        var new_elem = restoreNegativeMn(val);

    // Replace node and remove old ones
    jQuery(elem).replaceWith(new_elem);

    return 1;
}

function opPowMrowMrow(elem) {
    return 0;
}

// Handle the click in a root element
function opPow(elem) {
    var r;
    var h = opChildHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opPowMiMi(elem);
            break;
        case 2:
            r = opPowMnMn(elem);
            break;
        case 3:
            r = opPowMrowMrow(elem);
            break;
    }
    return r;
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Function to create trigonometric node
function trigCreate(fun, arg) {
    // Create node to replace
    var new_elem = mathmlCreateNode('mrow', '');

    var elem_fun = mathmlCreateNode('mi', fun);
    new_elem.appendChild(elem_fun);

    var elem_op = mathmlCreateNode('mo', '\u2061');
    new_elem.appendChild(elem_op);

    var elem_arg = mathmlCreateNode('mi', arg);
    new_elem.appendChild(elem_arg);

    return new_elem;
}

// Function to Filter trigonometric functions
function trigFilter(elem) {
    var r = {};
    var n = elem.nextElementSibling;
    var n2 = n.nextElementSibling;
    var row;

    // sin 1
    if (n2.nodeName.toLowerCase() === 'mn') {
        r.code = 1;
        r.n2 = [n2];
    }
    // sin \pi
    else if (n2.nodeName.toLowerCase() === 'mi') {
        r.code = 2;
        r.n2 = [n2];
    }
    else {
        if (n2.nodeName.toLowerCase() === 'mfenced')
            row = n2.firstElementChild;
        else
            row = n2;

        row;
        // sin (2 \pi)
        // sin (x + y)
        if (row.childElementCount === 3) {
            r.code = 3;
            r.n2 = row.children;
        }
        else
            r.code = -1;
    }

    return r;
}

// Compute the sin in radians.
function trigSin(elem) {
    var r;
    var f = trigFilter(elem);
    var n = elem.nextElementSibling;
    var n2 = n.nextElementSibling;
    var new_elem;
    var temp;

    switch (f.code) {
        // sin 1
        case 1:
            new_elem = mathmlCreateNode('mn', Math.sin(Number(f.n2[0].innerHTML)).toFixed(MATHMLJS.DECIMALS));
            r = 1;
            break;
        // sin \pi
        case 2:
            if (f.n2[0].innerHTML.trim().charCodeAt(0) === 960) {
                new_elem = mathmlCreateNode('mn', Math.sin(Math.PI).toFixed(MATHMLJS.DECIMALS));
                r = 1;
            }
            else {
                console.log('Unable to handle the parameter');
                r = 0;
            }
            break;
        // sin (2 \pi)
        // sin (x + y)
        case 3:
            switch (f.n2[1].innerHTML.trim().charCodeAt(0)) {
                case 43:  // +
                    // sin (x + y) = sin x cos y + cos x sin y
                    new_elem = mathmlCreateNode('mrow', '');

                    temp = trigCreate('sin', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u002B');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);

                    r = 1;
                    break;
                case 8722:  // minus sign
                case 45:  // "-" for nooby
                    // sin (x - y) = sin x cos y - cos x sin y
                    new_elem = mathmlCreateNode('mrow', '');

                    temp = trigCreate('sin', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2212');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);

                    r = 1;
                    break;
                case 215:  // multiplication sign
                case 183:  // middle dot
                case 8290:  // invisible times
                    if (f.n2[2].nodeName === 'mi' &&
                        f.n2[2].innerHTML.trim().charCodeAt(0) === 960 &&
                        f.n2[0].nodeName === 'mn') {
                        new_elem = mathmlCreateNode('mn', Math.sin(Number(f.n2[0].innerHTML) * Math.PI).toFixed(MATHMLJS.DECIMALS));
                        r = 1;
                    }
                    else {
                        console.log('Unable to handle the parameter');
                        r = 0;
                    }
                    break;
                default:
                    console.log('Not implement yet the operator \\u' + f.n2[1].innerHTML.trim().charCodeAt(0));
                    r = 0;
                    break;
            }
            break;
        case -1:
        default:
            console.log('Unable to handle the parameter');
            r = 0;
            break;
    }

    if (r === 1) {
        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);
        n.remove();
        n2.remove();
    }

    return r;
}

// Compute the cos in radians.
function trigCos(elem) {
    var r;
    var f = trigFilter(elem);
    var n = elem.nextElementSibling;
    var n2 = n.nextElementSibling;
    var new_elem;
    var temp;

    switch (f.code) {
        // cos 1
        case 1:
            new_elem = mathmlCreateNode('mn', Math.cos(Number(f.n2[0].innerHTML)).toFixed(MATHMLJS.DECIMALS));
            r = 1;
            break;
        // cos \pi
        case 2:
            if (f.n2[0].innerHTML.trim().charCodeAt(0) === 960) {
                new_elem = mathmlCreateNode('mn', Math.cos(Math.PI).toFixed(MATHMLJS.DECIMALS));
                r = 1;
            }
            else {
                console.log('Unable to handle the parameter');
                r = 0;
            }
            break;
        // cos (2 \pi)
        // cos (x + y)
        case 3:
            switch (f.n2[1].innerHTML.trim().charCodeAt(0)) {
                case 43:  // +
                    // cos (x + y) = sin x cos y + cos x sin y
                    new_elem = mathmlCreateNode('mrow', '');

                    temp = trigCreate('cos', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2212');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);

                    r = 1;
                    break;
                case 8722:  // minus sign
                case 45:  // "-" for nooby
                    // sin (x - y) = cos x cos y + sin x sin y
                    new_elem = mathmlCreateNode('mrow', '');

                    temp = trigCreate('cos', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u002B');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);

                    r = 1;
                    break;
                case 215:  // multiplication sign
                case 183:  // middle dot
                case 8290:  // invisible times
                    if (f.n2[2].nodeName === 'mi' &&
                        f.n2[2].innerHTML.trim().charCodeAt(0) === 960 &&
                        f.n2[0].nodeName === 'mn') {
                        new_elem = mathmlCreateNode('mn', Math.cos(Number(f.n2[0].innerHTML) * Math.PI).toFixed(MATHMLJS.DECIMALS));
                        r = 1;
                    }
                    else {
                        console.log('Unable to handle the parameter');
                        r = 0;
                    }
                    break;
                default:
                    console.log('Not implement yet the operator \\u' + f.n2[1].innerHTML.trim().charCodeAt(0));
                    r = 0;
                    break;
            }
            break;
        case -1:
        default:
            console.log('Unable to handle the parameter');
            r = 0;
            break;
    }

    if (r === 1) {
        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);
        n.remove();
        n2.remove();
    }

    return r;
}

// Compute the tan in radians.
function trigTan(elem) {
    var r;
    var f = trigFilter(elem);
    var n = elem.nextElementSibling;
    var n2 = n.nextElementSibling;
    var new_elem;
    var temp;
    var frac;
    var frac_temp;

    switch (f.code) {
        // tan 1
        case 1:
            new_elem = mathmlCreateNode('mn', Math.tan(Number(f.n2[0].innerHTML)).toFixed(MATHMLJS.DECIMALS));
            r = 1;
            break;
        // tan \pi
        case 2:
            if (f.n2[0].innerHTML.trim().charCodeAt(0) === 960) {
                new_elem = mathmlCreateNode('mn', Math.tan(Math.PI).toFixed(MATHMLJS.DECIMALS));
                r = 1;
            }
            else {
                console.log('Unable to handle the parameter');
                r = 0;
            }
            break;
        // tan (2 \pi)
        // tan (x + y)
        case 3:
            switch (f.n2[1].innerHTML.trim().charCodeAt(0)) {
                case 43:  // +
                    // tan (x + y) = (tan x + tan y) / (1 - tan x tan y)
                    new_elem = mathmlCreateNode('mrow', '');

                    frac = mathmlCreateNode('mfrac', '');
                    frac_temp = mathmlCreateNode('mrow', '');
                    temp = trigCreate('tan', f.n2[0].innerHTML);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u002B');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[2].innerHTML);
                    frac_temp.appendChild(temp);
                    frac.appendChild(frac_temp);
                    frac_temp = mathmlCreateNode('mrow', '');
                    temp = mathmlCreateNode('mn', 1);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2212');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[0].innerHTML);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[2].innerHTML);
                    frac_temp.appendChild(temp);
                    frac.appendChild(frac_temp);
                    new_elem.appendChild(frac);

                    r = 1;
                    break;
                case 8722:  // minus sign
                case 45:  // "-" for nooby
                    // tan (x - y) = (tan x - tan y) / (1 + tan x tan y)
                    // sin (x - y) = cos x cos y + sin x sin y
                    new_elem = mathmlCreateNode('mrow', '');

                    frac = mathmlCreateNode('mfrac', '');
                    frac_temp = mathmlCreateNode('mrow', '');
                    temp = trigCreate('tan', f.n2[0].innerHTML);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2212');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[2].innerHTML);
                    frac_temp.appendChild(temp);
                    frac.appendChild(frac_temp);
                    frac_temp = mathmlCreateNode('mrow', '');
                    temp = mathmlCreateNode('mn', 1);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u002B');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[0].innerHTML);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[2].innerHTML);
                    frac_temp.appendChild(temp);
                    frac.appendChild(frac_temp);
                    new_elem.appendChild(frac);

                    r = 1;
                    break;
                case 215:  // multiplication sign
                case 183:  // middle dot
                case 8290:  // invisible times
                    if (f.n2[2].nodeName === 'mi' &&
                        f.n2[2].innerHTML.trim().charCodeAt(0) === 960 &&
                        f.n2[0].nodeName === 'mn') {
                        new_elem = mathmlCreateNode('mn', Math.tan(Number(f.n2[0].innerHTML) * Math.PI).toFixed(MATHMLJS.DECIMALS));
                        r = 1;
                    }
                    else {
                        console.log('Unable to handle the parameter');
                        r = 0;
                    }
                    break;
                default:
                    console.log('Not implement yet the operator \\u' + f.n2[1].innerHTML.trim().charCodeAt(0));
                    r = 0;
                    break;
            }
            break;
        case -1:
        default:
            console.log('Unable to handle the parameter');
            r = 0;
            break;
    }

    if (r === 1) {
        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);
        n.remove();
        n2.remove();
    }

    return r;
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Replace InvisibleTimes
function replaceInvisibleTimes(mo) {
    var new_elem = mathmlCreateNode('mo', '\u00D7');
    jQuery(mo).replaceWith(new_elem);
}

// Replace mi element by mn
function replaceMiByMn(elem, number) {
    var sym = elem.innerHTML.trim();
    var mi = jQuery(elem).parents('math').find('mi');
    for (var i = 0; i < mi.length; i++) {
        if (mi[i].innerHTML.trim() === sym) {
            // Check if is the case of
            // <mn>...</mn> <mo>&InvisibleTimes;</mo> <mi>...</mi>
            // or
            // <mi>...</mi> <mo>&InvisibleTimes;</mo> <mi>...</mi>
            var p = mi[i].previousElementSibling;
            // Avoid when p is null
            if (p != null) {
                var p2 = p.previousElementSibling;
                if (p.nodeName.toLowerCase() === 'mo' &&
                        p.innerHTML.trim().charCodeAt(0) === 8290 &&
                        (p2.nodeName.toLowerCase() === 'mn' || p2.nodeName.toLowerCase() === 'mi')) {
                            // Need to replace <mo>&InvisibleTimes;</mo>
                            replaceInvisibleTimes(p);
                }
            }
            jQuery(mi[i]).replaceWith(mathmlCreateNode('mn', number));
        }
    }
    return true;
}

// Handle click for variables
function varClick(elem) {
    var r;
    var sym = elem.innerHTML.trim();
    switch (sym.charCodeAt(0)) {
        case 8520:  // double-struck italic small i
            console.log('The imaginary constant.')
            break;
        case 960:  // greek small letter pi
            var val = prompt('Replace ' + elem.innerHTML + ' by:', '3.14');
            if (val) {
                replaceMiByMn(elem, val);
            }
            else {
                console.log('Prompt have been cancel.');
            }
            r = true;
            break;
        case 8519:  // double-struck italic small e
            console.log('The Euler constant.')
            break;
        default:
            var val = prompt('Replace ' + elem.innerHTML + ' by:');
            if (val) {
                r =  replaceMiByMn(elem, val);
            }
            else {
                console.log('Prompt have been cancel.');
            }
            break;
    }
    return r;
}

// Handle for click in unsupport mi element
function miUnsuport(elem) {
    console.log('Function ' + elem.innerHTML.trim() + ' not support');
    return 0;
}

// Handle invisible separator click
function invSepClick(elem) {
    // TODO
    return 0;
}

// Handle click in mi element
function miClick(elem) {
    var r;
    switch (assum_mi(elem)) {
        case 0:  // variable
        case 2:  // invisible times
            r = varClick(elem);
            break;
        case 1:  // function
            switch (elem.innerHTML.trim()) {
                case 'sin':
                    r = trigSin(elem);
                    break;
                case 'cos':
                    r = trigCos(elem);
                    break;
                case 'tan':
                    r = trigTan(elem);
                    break;
                default:
                    r = miUnsuport(elem);
                    break;
            }
            break;
        case 3:  // invisible separator
            r = invSepClick(elem);
            break;
    }
    return r;
}

// Handle for click in unsupport mo element
function moUnsuport(elem) {
    console.log('Operator with charcode ' + elem.innerHTML.trim().charCodeAt(0) + ' not support');
    return 0;
}

// Handle for click in mo element
function moClick(e) {
    var r;
    var op = e.innerHTML.trim();
    switch (op.charCodeAt(0)) {
        case 43:  // +
            r = opPlus(e);
            break;
        case 8722:  // minus sign
        case 45:  // "-" for nooby
            r = opMinus(e);
            break;
        case 215:  // multiplication sign
        case 183:  // middle dot
            r = opTimes(e);
            break;
        case 247:  // division sign
        case 8725:  // division slash
        case 47:  // "/" for nooby
            r = opDiv(e);
            break;
        default:
            r = moUnsuport(e);
            break;
    }
    return r;
}

// Handle for click in mfrac element
function mfracClick(elem) {
    return opFrac(elem);
}

// Handle for click in mroot element
function mrootClick(elem) {
    return opRoot(elem);
}

// Handle for click in msqrt element
function msqrtClick(elem) {
    return opSqrt(elem);
}

// Handle for click in msup element
function msupClick(elem) {
    return opPow(elem);
}

// Setup click event
function setClick(elem) {
    elem.addEventListener('click', mathmlPreserve, false);
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Delete all the steps bellow.
function mathmlDelete(ev) {
    // Get the next sibling
    var nextS = this.nextSibling;
    var tmp;

    while (nextS && nextS.nodeName.toLowerCase() === 'math') {
        tmp = nextS.nextSibling;
        nextS.remove();  // it only remove the element from the DOM tree
        if (tmp && tmp.nodeName.toLowerCase() === 'button') {
            nextS = tmp.nextSibling;
            tmp.remove();  // it only remove the element from the DOM tree
            tmp = null;
        }
        else {
            nextS = null;
        }
    }

    // Remove the button.
    this.remove();
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function handleDragStart(e) {
    dragData = this;

    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'copy';

    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragData != this) {
        var pthis = jQuery(this).parents('math');
        var pdrag = jQuery(dragData).parents('math');
        if (pthis[0].id == pdrag[0].id) {
            console.log('Drag and drop inside equation not implemented.')
        }
        else {
            if ((this.nodeName.toLowerCase() == 'mi' || this.nodeName.toLowerCase() == 'mn') &&
                (dragData.nodeName.toLowerCase() == 'mi' || dragData.nodeName.toLowerCase() == 'mn')) {
                var cdrag = dragData.cloneNode(true);
                mathmlSetupElement(cdrag);
                jQuery(this).replaceWith(cdrag);
            }
            else {
                console.log('Drag and drop not implemented.')
            }
        }
    }

    e.preventDefault();
    return false;
}

function setDND(elem) {
    elem.setAttribute("draggable", "true");
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('drop', handleDrop, false);
}

// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Create basic node
function mathmlCreateNode(name, inner) {
    var new_elem = document.createElementNS('http://www.w3.org/1998/Math/MathML', name);
    new_elem.innerHTML = inner;
    mathmlSetupElement(new_elem);

    return new_elem;
}

// Create a undo "button"
function mathmlCreateDelete(visible) {
    var bdel = document.createElement('button');
    var style = 'float:right;width:auto;position:absolute;right:100px;';
    bdel.innerHTML = 'X';
    if (visible === false) {
        bdel.setAttribute('style', 'visibility:hidden;' + style);
    }
    else {
        bdel.setAttribute('style', style);
    }
    bdel.addEventListener('click', mathmlDelete, false);

    return bdel;
}

// Copy the equation and add it before if the operation success
function mathmlPreserve(ev) {
    // Get the math parent
    var jelem = $(this);
    var pmath = jelem.parents('math')[0];

    // This is a hack to avoid insert operation in the wrong location.
    //
    // Check if the nextElementSibling is a math element or a button what
    // indicate that some step have been done previously.
    if (pmath.nextSibling.nodeName.toLowerCase() === 'math' ||
            pmath.nextSibling.nodeName.toLowerCase() === 'button') {
        console.log('The next sibling is \'math\'. Not performing operation.');
        return null;
    }

    // Clone the element
    var cmath = pmath.cloneNode(true);
    // The cloneNode method won't clone the event handles
    $(cmath).find('*').each(mathmlSetup);

    var success;
    switch (this.nodeName.toLowerCase()) {
        case 'mi':
            success = miClick(this);
            break;
        case 'mo':
            success = moClick(this);
            break;
        case 'mfrac':
            success = mfracClick(this);
            break;
        case 'mroot':
            success = mrootClick(this);
            break;
        case 'msqrt':
            success = msqrtClick(this);
            break;
        case 'msup':
            success = msupClick(this);
            break;
    }

    // Copy the math before if success
    if (!MATHMLJS.OVERWRITE && success) {
        pmath.parentNode.insertBefore(cmath, pmath);

        // Create delete buttom
        var bdel = mathmlCreateDelete(true);
        pmath.parentNode.insertBefore(bdel, pmath);
    }

    if (this.nodeName.toLowerCase() != 'mn') {
        ev.stopPropagation();
        ev.preventDefault();
    }
}

// Check if a mrow element have only one element and in that case replace
// the mrow by it children.
function removeMrow(elem) {
    if (elem.nodeName.toLowerCase() === 'mrow' && elem.childElementCount === 1) {
        jQuery(elem).replaceWith(elem.firstElementChild);
    }
    // This is a hack since negative numbers MUST be represent as
    // <mrow> <mo>-</mo> <mn>...</mn> </mrow>
    else {
        // Check if it can be a negative number
        if (elem.nodeName.toLowerCase() === 'mrow' && elem.childElementCount === 2) {
            f = elem.firstElementChild;
            l = elem.lastElementChild;
            // Check if the first element is a minus sign and the last element
            // is a number.
            if (f.nodeName.toLowerCase() === 'mo' &&
                (f.innerHTML.trim().charCodeAt(0) === 8722 ||
                 f.innerHTML.trim().charCodeAt(0) === 45) &&
                l.nodeName.toLowerCase() === 'mn') {
                var new_elem = mathmlCreateNode('mn', -Number(l.innerHTML));
                jQuery(elem).replaceWith(new_elem);
            }
        }
    }
}

// Since negative numbers MUST be represent as
// <mrow> <mo>-</mo> <mn>...</mn> </mrow>
// we will go to restore than.
function restoreNegativeMn(number) {
    var new_elem = mathmlCreateNode('mrow', '');

    var mo = mathmlCreateNode('mo', '-');
    new_elem.appendChild(mo);

    var mn = mathmlCreateNode('mn', Math.abs(Number(number)));
    new_elem.appendChild(mn);

    return new_elem;
}

// Return a hash based on the childrens of a element
function opSiblingHash(elem) {
    removeMrow(elem.previousElementSibling);
    var f = elem.previousElementSibling.nodeName.toLowerCase();
    removeMrow(elem.nextElementSibling);
    var l = elem.nextElementSibling.nodeName.toLowerCase();
    if (f === 'mi' && l === 'mi')
        return 1;
    else if (f == 'mn' && l === 'mn')
        return 2;
    else if (f == 'mrow' || l === 'mrow')
        return 3;
    else
        return 0;
}

// Return a hash based on the childrens of a element
function opChildHash(elem) {
    removeMrow(elem.firstElementChild);
    var f = elem.firstElementChild.nodeName.toLowerCase();
    removeMrow(elem.lastElementChild);
    var l = elem.lastElementChild.nodeName.toLowerCase();
    if (f === 'mi' && l === 'mi')
        return 1;
    else if (f == 'mn' && l === 'mn')
        return 2;
    else if (f == 'mrow' || l === 'mrow')
        return 3;
    else
        return 0;
}

// Setup for each child from math element
function mathmlSetupElement(elem) {
    setMouseover(elem);
    setClick(elem);
    setDND(elem);
}

// Setup for each child from math element
function mathmlSetup() {
    setMouseover(this);
    setClick(this);
    setDND(this);
}

// Entry point.
function mathmlStart() {
    var math;
    math = document.getElementsByTagName('math');
    for (var i = 0; i < math.length; i++) {
        math[i].setAttribute('id', MATHMLJS.IDCOUNTER);
        MATHMLJS.IDCOUNTER += 1;

        if (math[i].getAttribute('display') === 'block') {
            var bdel = mathmlCreateDelete(false);
            math[i].parentNode.insertBefore(bdel, math[i]);
        }
    }

    if (MATHMLJS.ONLYDISPLAY) {
        $("math[display='block']").find('*').each(mathmlSetup);
    }
    else {
        $("math").find('*').each(mathmlSetup);
    }
}

// Setup events after load the page
window.onload = mathmlStart;

// Global variable
MATHMLJS = new Object();
MATHMLJS.IDCOUNTER = 0;
MATHMLJS.COLOR = 'orange';  // The color of select element
MATHMLJS.ONLYDISPLAY = true;  // Only interact with display
MATHMLJS.OVERWRITE = false;  // Not overwrite equations
MATHMLJS.DECIMALS = 2;  // Number of decimals
