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

