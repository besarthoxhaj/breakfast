/**
 * JOINS
 *
 * Given a normalised WhatsApp architecture
 *
 */

\i _settings.sql;

DROP TABLE IF EXISTS member CASCADE;
DROP TABLE IF EXISTS channel CASCADE;
DROP TABLE IF EXISTS member_channel CASCADE;
DROP TABLE IF EXISTS message CASCADE;

CREATE TABLE member (
  id    VARCHAR(20) PRIMARY KEY,
  name  VARCHAR(20)
);

CREATE TABLE channel (
  id       VARCHAR(20) PRIMARY KEY
);

CREATE TABLE member_channel (
  member   VARCHAR(20),
  channel  VARCHAR(20)
);

CREATE TABLE message (
  id          VARCHAR(20) PRIMARY KEY,
  text        VARCHAR(20),
  channel     VARCHAR(20),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO member (id, name) VALUES ('member.01', 'User.01');
INSERT INTO member (id, name) VALUES ('member.02', 'User.02');
INSERT INTO member (id, name) VALUES ('member.03', 'User.03');

INSERT INTO channel (id) VALUES ('channel.01');
INSERT INTO channel (id) VALUES ('channel.02');

INSERT INTO message (id, text, channel) VALUES ('message.01', 'Boom!!', 'channel.01');
INSERT INTO message (id, text, channel) VALUES ('message.02', 'Hello!', 'channel.01');
INSERT INTO message (id, text, channel) VALUES ('message.03', 'Ciao!!', 'channel.02');
INSERT INTO message (id, text, channel) VALUES ('message.04', 'Bye!!!', 'channel.01');
INSERT INTO message (id, text, channel) VALUES ('message.05', 'Last!!', 'channel.02');

INSERT INTO member_channel (member, channel) VALUES ('member.01', 'channel.01');
INSERT INTO member_channel (member, channel) VALUES ('member.02', 'channel.01');
INSERT INTO member_channel (member, channel) VALUES ('member.03', 'channel.02');
INSERT INTO member_channel (member, channel) VALUES ('member.01', 'channel.02');

-- SELECT message.*, MAX(message.created_at)
--   FROM message
--   GROUP BY message.id

CREATE VIEW last_message_by_channel AS
  SELECT message.id, message.text, message.channel, message.created_at
    FROM message
    JOIN (
      SELECT MAX(message.created_at)
      FROM message
      GROUP BY message.channel
    ) grouped_messages ON (
      grouped_messages.max = message.created_at
    );

  -- SELECT MAX(message.created_at) AS created_at
  -- FROM message
  -- GROUP BY message.channel;

SELECT *
  FROM last_message_by_channel;
  -- JOIN message ON (message.created_at = last_message_by_channel.created_at);

-- SELECT member.id, message.text
--   FROM message, member, channel, member_channel
--   WHERE
--     message.channel = member_channel.channel;

-- SELECT message.*
--   FROM message
--   WHERE message.created_at IN (
--     SELECT MAX(message.created_at)
--     FROM message
--     GROUP BY message.channel
--   );

-- SELECT * FROM last_message_by_channel;

-- CREATE VIEW hello AS
  WITH my_member_channels AS (
    SELECT channel
    FROM member_channel
    WHERE member = 'member.01'
  )
  SELECT member.name AS member, channel.id AS channel
    FROM my_member_channels
      JOIN member_channel ON (member_channel.channel = my_member_channels.channel)
      JOIN member ON (member.id = member_channel.member)
      JOIN channel ON (channel.id = my_member_channels.channel)
    WHERE member_channel.member != 'member.01';

-- SELECT message.*
--   FROM message
--   JOIN hello ON (hello.channel = message.channel)
--   WHERE message.created_at IN (
--     SELECT MAX(message.created_at)
--     FROM message
--     GROUP BY message.channel
--   )

-- SELECT *
--   FROM hello
--   JOIN message ON (message.channel = hello.channel);
