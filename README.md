# Positionally

Positionally is a 2d language in which only the presence and lack of commands matter. What command is executed depends on the instruction pointer's location.

IPs are spawned at the `@` instruction in the grid below, if this doesn't exist one is spawned at (0, 0).

## Commands

```
//<v>v\\
/012345\
>6789&|^
^+-*%d@<
>?.,:"$v
v()~{};<
\=sjpgS/
\\^<^>//
```

This grid repeats forever, so the IP's x/y are taken modulo 8 to get the commands.

`<>^v\/` - What you'd expect
`0-9` - single numbers
`+-*%d` - Maths operations
`@` - an IP starts here
`?` - Take input (-1 at EOF, but cycling)
`.` - Print as char
`,` - print as num
`:` - dup
`"` - stringmode (record nonspaces until next at pos)
`$` - swap
`()` - less/greater
`~` - pop
`{}` - shift left/right
`;` - Terminate IP
`=` - Equal?
`s` - Skip next op if nonzero
`j` - Pop two numbers and jump
`p` - Pop two numbers and an ord and put char
`g` - Pop two numbers and get char at point
`S` - Unconditionally skip next instruction
`&|` - push/pop global stack 

