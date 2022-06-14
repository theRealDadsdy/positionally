let positionally = (code, inputs = [], flags = '', output = x => process.stdout.write(x)) => {
    code = code.split('\n'), ips = [];

    let maxlength = Math.max(...code.map(x => x.length));
    code = code.map(x => x.padEnd(maxlength, ' ').split``);

    inputs = inputs.flatMap(x => typeof x == 'string' ? x.split``.map(x => x.charCodeAt()) : x);

    class Ip {
        constructor (x, y) {
            this.x = x;
            this.y = y;
            this.stack = [];
            this.dir = 0;
            this.inputs = [...inputs];
            // WHYYYY
            this.pop = this.pop.bind(this);
        }
        pop (num = 1) {
            let ret = [];
            for (let i = 0; i < num; i++) {
                if (this.stack.length) {
                    ret.push(this.stack.pop());
                } else if (this.inputs.length) {
                    ret.push(this.inputs[0])
                    this.inputs.push(this.inputs.shift());
                } else {
                    ret.push(0)
                }
            }
            return ret;
        }
    }
    let normalise = (x, y) => {
        ax = x % 8, ay = y % 8;
        return `//<v>v\\\\/012345\\>6789&|^^+-*%d@<>?.,:"$vv()~{};<\\=sjpgS/\\\\^<^>//`[
            ax + ay * 8
        ]
    }

    if (flags.includes('s')) {
        output(`${code.map((row, y) => 
            row.map((cell, x) => 
                cell == ' ' ? normalise(x, y) : ''
            ).join``).join('\n')
        }\n`);
    }

    for (let row = 0; row < code.length; row++) {
        for (let col = 0; col < code[row].length; col++) {
            if (normalise(row, col) == '@' && code[row][col] !== ' ') {
                ips.push(new Ip(row, col));
            }
        }
    }
    if (ips.length == 0) {
        ips.push(new Ip(0, 0));
    }

    let stringmode = false, skip = false, global_stack = [];

    while (ips.length > 0) {
        for (let i = 0; i < ips.length; i++) {
            let ip = ips[i], {x, y, stack, pop, inputs} = ip, push = ip.stack.push.bind(ip.stack);
            if (code[y][x] !== ' ') {
                let char = normalise(x, y)
                if (stringmode) {
                    if (char == '"') {
                        stringmode = false;
                    } else {
                        push(code[y][x].charCodeAt());
                    }
                } else if (skip) {
                    skip = false;
                } else {
                    if (char == '/') {
                        ip.dir ^= 1;
                    } else if (char == '\\') {
                        ip.dir ^= 3;
                    } else if ('>v<^'.includes(char)) {
                        ip.dir = '>v<^'.indexOf(char);
                    } else if (/\d/.test(char)) {
                        push(+char);
                    } else if (char == '?') {
                        push(inputs[0]);
                        inputs.push(inputs.shift());
                    } else if (char == '.') {
                        output(String.fromCharCode(pop()[0]));
                    } else if (char == ',') {
                        output(pop()[0].toString())
                    } else if (char == ':') {
                        let [item] = pop();
                        push(item, item);
                    } else if (char == ';') {
                        ips.splice(i, 1);
                        i--;
                    } else if (char == '"') {
                        stringmode = true;
                    } else if (char == '$') {
                        let [a, b] = pop(2);
                        push(a, b);
                    } else if (char == ')') {
                        let [a, b] = pop(2);
                        push(+(b < a));
                    } else if (char == '(') {
                        let [a, b] = pop(2);
                        push(+(b > a));
                    } else if (char == '=') {
                        let [a, b] = pop(2);
                        push(+(b == a));
                    } else if (char == '~') {
                        pop();
                    } else if (char == 's') {
                        if (pop()) skip = true;
                    } else if (char == 'j') {
                        let [X, Y] = pop(2);
                        ip.x = X;
                        ip.y = Y;
                    } else if (char == 'p') {
                        let [X, Y, char] = pop(2);
                        try {
                        code[Y][X] = String.fromCharCode(char);
                        } catch (e) {}
                    } else if (char == 'g') {
                        let [X, Y] = pop(2);
                        push(code[Y]?.[X]?.charCodeAt() ?? 0);
                    } else if (char == 'S') {
                        skip = true;
                    } else if (char == '|') {
                        global_stack.push(pop())
                    } else if (char == '&') {
                        push(global_stack.pop())
                    } else if (char == '+') {
                        let [a, b] = pop(2);
                        push(a + b);
                    } else if (char == '-') {
                        let [a, b] = pop(2);
                        push(a - b);
                    } else if (char == '*') {
                        let [a, b] = pop(2);
                        push(a * b);
                    } else if (char == '%') {
                        let [a, b] = pop(2);
                        push(a % b);
                    } else if (char == 'd') {
                        let [a, b] = pop(2);
                        push(a / b | 0);
                    }
                }
            }
            switch (ip.dir) {
                case 0: 
                    ip.x++;
                    if (ip.x == code[0].length) ip.x = 0;
                    break;
                case 1:
                    ip.y++;
                    if (ip.y == code.length) ip.y = 0;
                    break;
                case 2:
                    ip.x--;
                    if (ip.x == -1) ip.x = code[0].length - 1;
                    break;
                case 3:
                    ip.y--;
                    if (ip.y == -1) ip.y = code.length - 1;
                    break;
            }
            if (flags.includes('d')) output([ip.x, ip.y, code[ip.y][ip.x], normalise(ip.x, ip.y), ip.stack].join` ` + '\n');
        }
    }
    output('\n')
}

if (typeof module != 'undefined' && module?.exports) {
    module.exports = positionally;
} else {
    window.positionally = positionally;
}
