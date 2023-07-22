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

`<>^v\/` - Turns the IP or mirrors the IP.  
`0-9` - Pushes 0-9 onto the stack.  
`+-*%d` - Maths operations.  
`@` - an IP starts here, going right.  
`?` - Take input terminated with -1, cycling.  
`.` - Print as char.  
`,` - Print as num.  
`:` - Duplicate.  
`"` - stringmode (record nonspaces until next at pos).  
`$` - Swap the top elements of the stack.  
`()` - less/greater than.  
`~` - Pop and ignore.  
`{}` - Roll the stack left/right.  
`;` - Terminate IP.  
`=` - Test equality.    
`s` - Skip next op if nonzero.  
`j` - Pop two numbers and jump.  
`p` - Pop two numbers and an ord and put char.  
`g` - Pop two numbers and get char at point.  
`S` - Unconditionally skip next instruction.  
`&|` - push/pop global stack.  

