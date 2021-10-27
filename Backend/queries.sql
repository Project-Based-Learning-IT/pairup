-- SELECT m1.*
-- FROM messages AS m1
--   INNER JOIN (
--     select T1.pid pid,
--       max(T1.maxMsgID) maxMsgID
--     from (
--         select R.RECEIVER_ID pid,
--           max(R.Message_ID) maxMsgID
--         from messages as R
--         where R.SENDER_ID = 709
--         group by R.RECEIVER_ID
--         union
--         distinct
--         select S.Sender_ID pid,
--           max(S.Message_ID) maxMsgID
--         from messages AS S
--         where S.Receiver_ID = 709
--         group by S.Sender_ID
--       ) AS T1
--     GROUP BY T1.pid
--     order by T1.maxMsgID desc
--   ) AS maxTs ON m1.Message_ID = maxTs.maxMsgID -- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- Query to get last messages of a chat and count of unread fetched messages after last cached time
SELECT m1.*,
  NewSC.newmsgs,
  StudNI.Name,
  StudNI.Image_URL
FROM messages AS m1
  INNER JOIN (
    select Sender_ID,
      COUNT(*) newmsgs
    from messages as NewM
    where NewM.timestamp > '2021-10-26 13:10:38'
      and NewM.Sender_ID != 709
    group by NewM.Sender_ID
  ) AS NewSC
  INNER JOIN (
    select T1.pid pid,
      max(T1.maxMsgID) maxMsgID
    from (
        select R.RECEIVER_ID pid,
          max(R.Message_ID) maxMsgID
        from messages AS R
        where R.SENDER_ID = 709
        group by R.RECEIVER_ID
        union
        distinct
        select S.Sender_ID pid,
          max(S.Message_ID) maxMsgID
        from messages AS S
        where S.Receiver_ID = 709
        group by S.Sender_ID
      ) AS T1
    GROUP BY T1.pid
  ) AS maxTsC
  INNER JOIN (
    select Student_ID,
      Name,
      Image_URL
    from student AS Stud
  ) AS StudNI ON m1.Message_ID = maxTsC.maxMsgID
  AND NewSC.Sender_ID = maxTsC.pid
  AND maxTsC.pid = StudNI.Student_ID -- order by T1.maxMsgID desc