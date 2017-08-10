------------------------------------------------------------------------------
-- | THIS SPROC WILL CAREATE A SAMPLE ENTRY IN THE DATABASE
-- | 
-- DATE			USER			MEMO
-- 8/10/2017 | JAVIER RIVERA | Initial Creation
------------------------------------------------------------------------------

CREATE PROCEDURE [dbo].[CreateSample]
	@barcode varchar(50),
	@CreatedBy smallInt,
	@statusId smallInt
AS

	DECLARE @date DATE = GETDATE()

	INSERT INTO [dbo].[Samples] ([StatusId], [Barcode], [CreatedAt], [CreatedBy])
		VALUES(@statusId, @barcode, @date, @CreatedBy)

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
	WHERE S.SampleId = @@IDENTITY
