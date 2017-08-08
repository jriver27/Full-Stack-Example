------------------------------------------------------------------------------
-- | THIS STORED PROCEDURE WILL RETRIEVE ALL THE INFORMATION OF THE USER
-- | THIS INCULDES ALL THE USERS ACTIVE SAMPLES
-- DATE			USER			MEMO
-- 8/4/2017 | JAVIER RIVERA | Initial Creation
------------------------------------------------------------------------------
  
ALTER PROCEDURE [dbo].[UserAllSamples]
	@userId int = 0
AS

SET NOCOUNT ON;  

---- TESTING
--DECLARE @userId smallint = 10;
---- TESTING

SELECT 
	u.UserId, 
	u.FirstName, 
	u.LastName, 
	s.SampleID,
	s.Barcode,
	s.CreatedAt,
	s.StatusId,
	st.Status
FROM Users as u
	LEFT JOIN Samples as s on u.UserId = s.CreatedBy
	LEFT JOIN Statuses AS st on st.StatusId = s.StatusId
WHERE u.UserId = @userId

GO
