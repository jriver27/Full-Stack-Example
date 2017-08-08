------------------------------------------------------------------------------
-- | THIS STORED PROCEDURE WILL RETRIEVE ALL THE INFORMATION OF THE USER
-- | THIS INCULDES ALL THE USERS ACTIVE SAMPLES
-- DATE			USER			MEMO
-- 8/4/2017 | JAVIER RIVERA | Initial Creation
------------------------------------------------------------------------------
  
CREATE PROCEDURE [dbo].[UserAllSamples]
	@userId int = 0
AS

SET NOCOUNT ON;  

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
	Right Join Samples as s on s.CreatedBy = u.UserId
	RIGHT JOIN Statuses AS st on st.StatusId = s.StatusId
WHERE u.UserId = @userId

GO
