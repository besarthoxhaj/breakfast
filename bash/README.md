## Bash

## File descriptors

They can be used to connect processes to each other. Each process will generally
have three standard file descriptors: standard input (FD 0), standard output (FD 1)
and standard error (FD 2).

## Commands

Every bash program is built in the following way:

```
[ var=value ... ] name [ arg ... ] [ redirection ... ]
```

### Name

**type**
```sh
$ type ping
> ping is /sbin/ping
$ type -a echo              # The -a switch tells type to show us all the possibilities
> echo is a shell builtin   # If we just run 'echo', bash will use the first possibility
> echo is /bin/echo         # We have an echo built-in but also a program called echo!
```

### Arguments

Single vs double quotes:
```sh
$ echo 'Hello $PATH'
> Hello $PATH
$ echo "Hello $PATH"
> Hello /usr/local/bin:/usr/bin
```

## Redirection

```sh
$ ls a b                           # Imagine we have a file called "a", but not a file called "b".
> ls: b: No such file or directory # Error messages are emit on FD 2
> a                                # Results are emit on FD 1

                 ╭──────────╮
    Keyboard ╾┬─╼┥0  bash  1┝╾─┬─╼ Display
              │  │         2┝╾─┤ 
              │  ╰─────┬────╯  │
              │        ╎       │
              │  ╭─────┴────╮  │
              └─╼┥0  ls    1┝╾─┤
                 │         2┝╾─┘
                 ╰──────────╯
```

Redirection is the practice of changing the source or destination of a file descriptor.
One thing we could do with redirection is write ls' result to a file instead of to
the terminal display.

```sh
$ ls a b >myfiles.ls                 # We redirect FD 1 to the file "myfiles.ls"
> ls: b: No such file or directory   # Error messages are emit on FD 2
                 ╭──────────╮
    Keyboard ╾┬─╼┥0  bash  1┝╾─┬─╼ Display
              │  │         2┝╾─┤
              │  ╰─────┬────╯  │
              │        ╎       │
              │  ╭─────┴────╮  │
              └─╼┥0  ls    1┝╾─╌─╼ myfiles.ls
                 │         2┝╾─┘
                 ╰──────────╯

$ cat myfiles.ls                     # The cat command shows us the contents of a file
> a
```

The character '**>**' redirect **standard output**.

What about *standard error*?

```sh
$ ls a b >myfiles.ls 2>/dev/null    # We redirect FD 1 to the file "myfiles.ls"
                                    # and FD 2 to the file "/dev/null"

             ╭──────────╮
Keyboard ╾┬─╼┥0  bash  1┝╾─┬─╼ Display
          │  │         2┝╾─┘
          │  ╰─────┬────╯
          │        ╎
          │  ╭─────┴────╮
          └─╼┥0  ls    1┝╾─╌─╼ myfiles.ls
             │         2┝╾─╌─╼ /dev/null
             ╰──────────╯

$ cat myfiles.ls                    # The cat command shows us the contents of a file
> a                                 # The result is now in myfiles.ls
$ cat /dev/null                     # The /dev/null file is empty?
```

The characters '**2>**' redirect **standard error**.

> The file **null** is in the **/dev** directory: This is a special directory
  for device files. Device files are special files that represent devices in our
  system. When we write to or read from them, we're communicating directly with
  those devices through the kernel. The **null** device is a special device that
  is always empty. Anything you write to it will be lost and nothing can be read
  from it. That makes it a very useful device for discarding information. We stream
  our unwanted error message to the **null** device and it disappears.

```sh
$ ls -l a b >myfiles.ls 2>myfiles.ls    # Redirect both file descriptors to myfiles.ls?

             ╭──────────╮
Keyboard ╾┬─╼┥0  bash  1┝╾─┬─╼ Display
          │  │         2┝╾─┘
          │  ╰─────┬────╯
          │        ╎
          │  ╭─────┴────╮
          └─╼┥0  ls    1┝╾─╌─╼ myfiles.ls
             │         2┝╾─╌─╼ myfiles.ls
             ╰──────────╯
```

The problem is that both file descriptors now have their own stream to the file.
This is problematic because both streams are merged into the file, the results
are an arbitrary mix-together of the streams.
To solve this problem, you need to send both your output and error bytes on the
same stream. And to do that, you're going to need to know how to duplicate *file descriptors*:

```sh
$ ls -l a b >myfiles.ls 2>&1          # Make FD 2 write to where FD 1 is writing

             ╭──────────╮
Keyboard ╾┬─╼┥0  bash  1┝╾─┬─╼ Display
          │  │         2┝╾─┘
          │  ╰─────┬────╯
          │        ╎
          │  ╭─────┴────╮
          └─╼┥0  ls    1┝╾─┬─╼ myfiles.ls
             │         2┝╾─┘
             ╰──────────╯
```

The characters '**>&**' copy file file descriptors e.g. '**2>&1**'.
You can translate the syntax **2>&1** as `Make FD 2 write(>) to where FD(&) 1 is currently writing.`.

> Duplicating file descriptors, otherwise referred to as "copying" file descriptors,
  is the act of copying one file descriptor's stream connection to another file descriptor.

```sh
$ ls -l a b 2>&1 >myfiles.ls   # No
$ ls -l a b >myfiles.ls 2>&1   # Yes
```

Another way to redirect both standard output and standard error

```sh
$ ls -l a &>myfiles.ls   # Yes
```

## Resources

- understand the unix file system
  - [filesystem hierarchy standard](http://www.pathname.com/fhs/)
- http://guide.bash.academy/