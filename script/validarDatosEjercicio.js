var _0x1594 = ['67fbVShZ', 'png', 'log', '36538zzZUwL', 'doc', 'image', 'linkVideo', '43795QOllqJ', 'formulario1', '25779OpUwDJ', 'Agregar_Ejercicio', 'wmv', 'name', 'length', 'eName', 'getElementById', 'preventDefault', '339914ZkCYJg', 'Debe\x20agregar\x20una\x20imagen', 'toLowerCase', 'forms', '1zJENrx', '4027NwzGDP', '1fdevXx', 'files', '1YVkzKy', 'firestore', 'El\x20campo\x20nombre\x20no\x20acepta\x20caracteres\x20especiales\x20ni\x20mas\x20de\x20150\x20caracteres', 'gif', 'Videos/', 'set', 'Videos/\x20', 'jpeg', '1VBVKuV', 'Solo\x20se\x20permiten\x20archivos\x20en\x20formato:\x20jpg,jpeg,png,bmp\x20y\x20gif', 'El\x20campo\x20descripcion\x20no\x20acepta\x20numeros\x20o\x20esta\x20vacio', 'Imagenes/', 'search', 'El\x20campo\x20nombre\x20no\x20acepta\x20numeros\x20o\x20esta\x20vacio', '278029kYQXWI', 'formularioEjercicio', 'click', 'put', 'Solo\x20se\x20permiten\x20archivos\x20en\x20formato:\x20mp4,mkv\x20y\x20wmv', 'ref', 'name1', 'Agregado\x20Correctamente', 'match', '17977dHCjOH', 'descripcion', '3tAdlUa', 'mkv', 'value', 'Imagenes/\x20', 'state_changed', 'video', 'storage'];
var _0x41b1e3 = _0x3aaf;

function _0x3aaf(_0xd9d639, _0x4d7453) { _0xd9d639 = _0xd9d639 - 0xd3; var _0x1594c5 = _0x1594[_0xd9d639]; return _0x1594c5; }(function(_0x59177b, _0x1f7f74) { var _0x124b06 = _0x3aaf; while (!![]) { try { var _0x56417b = -parseInt(_0x124b06(0xef)) * parseInt(_0x124b06(0x10a)) + -parseInt(_0x124b06(0xf5)) * parseInt(_0x124b06(0xe7)) + -parseInt(_0x124b06(0xd5)) + -parseInt(_0x124b06(0x107)) * -parseInt(_0x124b06(0xe4)) + parseInt(_0x124b06(0xe5)) * parseInt(_0x124b06(0xdf)) + -parseInt(_0x124b06(0x100)) * parseInt(_0x124b06(0xd7)) + parseInt(_0x124b06(0xfe)) * parseInt(_0x124b06(0xe3)); if (_0x56417b === _0x1f7f74) break;
            else _0x59177b['push'](_0x59177b['shift']()); } catch (_0x2b8c9d) { _0x59177b['push'](_0x59177b['shift']()); } } }(_0x1594, 0x2ee01));
const dbE = firebase[_0x41b1e3(0xe8)]();
var buenaImg = ![],
    buenVideo = ![];

function validateForm() { var _0xb38544 = _0x41b1e3,
        _0x3b5915 = document[_0xb38544(0xe2)]['formularioEjercicio'][_0xb38544(0xdc)][_0xb38544(0x102)],
        _0x3a7577 = document[_0xb38544(0xe2)][_0xb38544(0xf6)]['eName']['value'],
        _0x34ee04 = /[0-9]{1,40}$/,
        _0x2680f6 = !![],
        _0x2bffd9 = !![]; if (_0x3b5915['match'](_0x34ee04) || _0x3b5915 == '') alert(_0xb38544(0xf4)), _0x2680f6 = ![];
    else validarTexto(_0x3b5915) == ![] && (alert(_0xb38544(0xe9)), _0x2680f6 = ![]); return (_0x3a7577[_0xb38544(0xfd)](_0x34ee04) || _0x3a7577 == '') && (alert(_0xb38544(0xf1)), _0x2bffd9 = ![]), _0x2680f6 && _0x2bffd9; }

function validateFileType() { var _0xad1388 = _0x41b1e3,
        _0x55fa15 = document['getElementById'](_0xad1388(0xd3))[_0xad1388(0x102)],
        _0xa98db0 = _0x55fa15['lastIndexOf']('.') + 0x1,
        _0x35982c = _0x55fa15['substr'](_0xa98db0, _0x55fa15[_0xad1388(0xdb)])[_0xad1388(0xe1)](); return _0x35982c == 'jpg' || _0x35982c == _0xad1388(0xee) || _0x35982c == _0xad1388(0x108) || _0x35982c == _0xad1388(0xea) || _0x35982c == 'bmp' ? buenaImg = !![] : (buenaImg = ![], alert(_0xad1388(0xf0)), document[_0xad1388(0xdd)](_0xad1388(0xd3))[_0xad1388(0x102)] = ''), buenaImg; }

function validateVideo() { var _0x134ade = _0x41b1e3,
        _0x2a148b = document['getElementById'](_0x134ade(0x105))[_0x134ade(0x102)],
        _0x24ac28 = _0x2a148b['lastIndexOf']('.') + 0x1,
        _0x250eea = _0x2a148b['substr'](_0x24ac28, _0x2a148b[_0x134ade(0xdb)])[_0x134ade(0xe1)](); return _0x250eea == 'mp4' || _0x250eea == _0x134ade(0x101) || _0x250eea == _0x134ade(0xd9) ? buenVideo = !![] : (buenVideo = ![], alert(_0x134ade(0xf9)), document[_0x134ade(0xdd)]('video')[_0x134ade(0x102)] = ''), buenaImg; }
document['getElementById']('enviarEjercicio')['addEventListener'](_0x41b1e3(0xf7), async _0x4f7e90 => { var _0x3dceb2 = _0x41b1e3; const _0x1fa801 = document['getElementById'](_0x3dceb2(0xd6)),
        _0xcc1885 = _0x1fa801[_0x3dceb2(0xfb)][_0x3dceb2(0x102)],
        _0x204af3 = _0x1fa801[_0x3dceb2(0xff)][_0x3dceb2(0x102)],
        _0x5e7952 = subirImagen(),
        _0x5070ff = subirVideo(),
        _0x1b19c4 = _0x1fa801[_0x3dceb2(0xd4)][_0x3dceb2(0x102)],
        _0xbc43cb = _0x1fa801['nivel'][_0x3dceb2(0x102)],
        _0x421f45 = _0x1fa801['areaT'][_0x3dceb2(0x102)];
    _0x4f7e90[_0x3dceb2(0xde)](); if (validateForm()) { if (_0x5e7952 != '\x20' && buenaImg) { const _0x311e70 = await dbE['collection'](_0x3dceb2(0xd8))[_0x3dceb2(0x10b)]()[_0x3dceb2(0xec)]({ 'nombreE': _0xcc1885, 'descripcion': _0x204af3, 'imageRef': _0x5e7952, 'videoRef': _0x5070ff, 'linkV': _0x1b19c4, 'nivelE': _0xbc43cb, 'areaT': _0x421f45 });
            alert(_0x3dceb2(0xfc)), document[_0x3dceb2(0xdd)]('formulario1')['reset'](), console[_0x3dceb2(0x109)](_0x311e70); } else alert(_0x3dceb2(0xe0)); } });

function subirImagen() { var _0x1057ea = _0x41b1e3,
        _0x4d067f = '\x20',
        _0x48d551 = document[_0x1057ea(0xdd)]('image')[_0x1057ea(0xe6)][0x0]; if (_0x48d551 != null) { var _0x4ae28a = _0x48d551[_0x1057ea(0xda)],
            _0x13b771 = firebase[_0x1057ea(0x106)]()[_0x1057ea(0xfa)](_0x1057ea(0xf2) + _0x48d551['name']);
        _0x4d067f = _0x1057ea(0x103) + _0x48d551[_0x1057ea(0xda)]; var _0x3abbdb = _0x13b771[_0x1057ea(0xf8)](_0x48d551);
        _0x3abbdb['on'](_0x1057ea(0x104), function(_0x586f37) {}); } return _0x4d067f; }

function subirVideo() { var _0x3e8640 = _0x41b1e3,
        _0x4f3a7a = '\x20',
        _0x4d1a2b = document[_0x3e8640(0xdd)](_0x3e8640(0x105))['files'][0x0]; if (_0x4d1a2b != null) { var _0x7638a4 = _0x4d1a2b[_0x3e8640(0xda)],
            _0x2cbd67 = firebase[_0x3e8640(0x106)]()[_0x3e8640(0xfa)](_0x3e8640(0xeb) + _0x4d1a2b['name']);
        _0x4f3a7a = _0x3e8640(0xed) + _0x4d1a2b[_0x3e8640(0xda)]; var _0x1f2a0f = _0x2cbd67['put'](_0x4d1a2b);
        _0x1f2a0f['on'](_0x3e8640(0x104), function(_0x3df39c) {}); } return _0x4f3a7a; }

function validarTexto(_0x4c2d56) { var _0x5d0601 = _0x41b1e3,
        _0x2221b = /^[a-zA-Z-\s]{1,150}$/; return _0x4c2d56[_0x5d0601(0xf3)](_0x2221b) ? ![] : !![]; }