import shell from "shelljs";

// Copy EJS files to dist
shell.cp("-r", "mail/messages/", "dist/mail/");