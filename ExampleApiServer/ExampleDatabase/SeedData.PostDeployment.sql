/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
------------------------------------------------------------
-- REMOVE ALL REFERENCES TO THE TABLES ON EACH BUILD
------------------------------------------------------------
BEGIN TRANSACTION DropTables;


IF OBJECT_ID('dbo.Samples', 'U') IS NOT NULL 
	DROP TABLE dbo.Samples;


IF OBJECT_ID('dbo.Statuses', 'U') IS NOT NULL 
	DROP TABLE dbo.Statuses;
	
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL 
	DROP TABLE dbo.Users;


COMMIT TRANSACTION DropTables
GO

------------------------------------------------------------
-- CREATING TABLES FOR THE DEMO APP
------------------------------------------------------------
BEGIN TRANSACTION CreateTables
GO
CREATE TABLE [dbo].[Statuses]
(
	[StatusId] INT NOT NULL PRIMARY KEY, 
    [Status] VARCHAR(50) NULL
)
GO
CREATE TABLE [dbo].[Users]
(
	[UserId] INT NOT NULL PRIMARY KEY, 
    [FirstName] VARCHAR(15) NULL, 
    [LastName] VARCHAR(15) NULL
)
GO
CREATE TABLE [dbo].[Samples]
(
	[SampleId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Barcode] VARCHAR(50) NULL, 
    [CreatedAt] DATE NULL, 
    [CreatedBy] INT FOREIGN KEY REFERENCES Users(UserId),
    [StatusId] INT FOREIGN KEY REFERENCES Statuses(StatusId)
)
GO

COMMIT TRANSACTION CreateTables
GO
------------------------------------------------------------
-- CREATE THE DEMO PROCEDURES
------------------------------------------------------------
BEGIN TRANSACTION CreateProcedures

GO
-- ALL USERS
IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.AllUsers'))
   exec('CREATE PROCEDURE [dbo].[AllUsers] AS BEGIN SET NOCOUNT ON; END') 
Go

ALTER PROCEDURE [dbo].[AllUsers]
AS
SELECT U.UserId, U.FirstName, U.LastName,
    STUFF(( 
        SELECT ', ' + CAST(S.SampleId AS varchar(5))
        FROM Samples S
        WHERE S.CreatedBy = U.UserId
        FOR XML PATH('') 
        ), 1, 2, '' )
    AS SampleIds
FROM Users U

GO
-- USER ALL SAMPLES
IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.UserAllSamples'))
   exec('CREATE PROCEDURE [dbo].[UserAllSamples] AS BEGIN SET NOCOUNT ON; END')
GO

ALTER PROCEDURE [dbo].[UserAllSamples]
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

-- GetAllSamplesWithUserAndStatusInfo
IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.GetAllSamplesWithUserAndStatusInfo'))
   exec('CREATE PROCEDURE [dbo].[GetAllSamplesWithUserAndStatusInfo] AS BEGIN SET NOCOUNT ON; END')
GO

ALTER PROCEDURE [dbo].[GetAllSamplesWithUserAndStatusInfo]
AS
	SELECT 
		S.SampleId,
		S.Barcode,
		S.CreatedAt,
		U.UserId,
		U.FirstName,
		U.LastName,
		ST.StatusId,
		ST.Status	
	FROM [dbo].Samples S
	RIGHT JOIN Users U on U.UserId = S.CreatedBy 
	RIGHT JOIN Statuses ST on ST.StatusId = S.StatusId
GO

-- EditSample
IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.EditSample'))
   exec('CREATE PROCEDURE [dbo].[EditSample] AS BEGIN SET NOCOUNT ON; END')
GO

ALTER PROCEDURE [dbo].[EditSample]
	@id int,
	@barcode varchar(50),
	@userId smallInt,
	@statusId smallInt
AS
	UPDATE dbo.Samples
	SET
		Barcode = @barcode,
		CreatedBy = @userId,
		StatusId = @statusId
	FROM dbo.Samples
	WHERE Samples.SampleId = @id

	SELECT
		S.Barcode,
		S.CreatedAt,
		U.userId,
		S.SampleId,
		S.StatusId,
		ST.Status
	FROM Samples S
	RIGHT JOIN Statuses ST ON ST.StatusId = S.StatusId
	RIGHT JOIN Users U ON U.UserId = S.CreatedBy
GO

-- CreateSample
IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.CreateSample'))
   exec('CREATE PROCEDURE [dbo].[CreateSample] AS BEGIN SET NOCOUNT ON; END')
GO
ALTER PROCEDURE [dbo].[CreateSample]
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
GO
COMMIT TRANSACTION CreateProcedures
GO

------------------------------------------------------------
-- INSERT DEMO DATA 
------------------------------------------------------------
BEGIN TRANSACTION SeedData
INSERT INTO dbo.Statuses(StatusId, Status)
 VALUES (0, N'Received'),
 (1, N'Accessioning'),
 (2, N'In Lab'),
 (3, N'Report Generation');

INSERT INTO dbo.Users (UserId, FirstName, LastName)
VALUES (0, N'Kristine', N'Butler'),
	(1,'Alfred', N'McKenzie'),
    (2,N'Cora', N'Hunt'),
    (3,N'Brad', N'Huff'),
    (4,N'Dewey', N'McDonald'),
    (5,N'Orlando', N'Holt'),
    (6,N'Clint', N'Reid'),
    (7,N'Kim', N'Mullins'),
    (8,N'Blanche', N'Mack'),
    (9,N'Dwayne', N'Pena'),
    (10,N'Javier', N'Rivera'),
    (11,N'Sneaky', N'Person');

INSERT INTO dbo.Samples (Barcode, CreatedAt, CreatedBy, StatusId)
VALUES (N'129076', N'2015-01-02', 6, 3),
    (N'850314', N'2015-06-15', 11, 3),
    (N'176033', N'2015-07-31', 7, 0),
    (N'129629', N'2015-01-21', 3, 0),
    (N'773561', N'2015-02-21', 9, 1),
    (N'255253', N'2015-05-13', 9, 0),
    (N'693294', N'2015-05-11', 3, 2),
    (N'455116', N'2015-09-13', 6, 0),
    (N'280561', N'2015-04-08', 5, 3),
    (N'863760', N'2016-01-25', 0, 3),
    (N'211102', N'2015-08-24', 4, 2),
    (N'193882', N'2016-01-23', 8, 1),
    (N'502533', N'2016-03-08', 2, 1),
    (N'371726', N'2015-04-15', 8, 1),
    (N'807891', N'2015-05-17', 2, 1),
    (N'845318', N'2016-03-22', 7, 1),
    (N'601386', N'2015-11-18', 3, 1),
    (N'978804', N'2015-05-31', 5, 2),
    (N'759456', N'2015-09-23', 8, 2),
    (N'949933', N'2015-07-04', 0, 3),
    (N'411443', N'2015-03-16', 3, 0),
    (N'202485', N'2015-09-03', 0, 3),
    (N'737715', N'2015-10-07', 0, 1),
    (N'106957', N'2015-10-03', 7, 1),
    (N'561154', N'2016-02-23', 9, 1),
    (N'923720', N'2015-06-09', 2, 1),
    (N'985114', N'2015-04-17', 4, 0),
    (N'544078', N'2015-06-16', 6, 3),
    (N'605315', N'2015-06-23', 7, 0),
    (N'588963', N'2015-02-13', 7, 1),
    (N'646434', N'2015-08-23', 0, 2),
    (N'819931', N'2015-11-10', 0, 2),
    (N'978799', N'2015-11-06', 2, 3),
    (N'250878', N'2016-03-14', 6, 1),
    (N'499463', N'2015-10-20', 5, 3),
    (N'261808', N'2015-09-25', 5, 3),
    (N'496077', N'2015-04-12', 8, 2),
    (N'939988', N'2015-05-15', 4, 2),
    (N'142598', N'2015-06-04', 7, 1),
    (N'648235', N'2015-12-26', 6, 2),
    (N'949270', N'2015-10-22', 0, 0),
    (N'606179', N'2015-10-12', 5, 2),
    (N'762654', N'2016-03-04', 2, 0),
    (N'230403', N'2015-07-20', 5, 1),
    (N'419103', N'2016-02-09', 2, 0),
    (N'105914', N'2016-01-19', 5, 3),
    (N'292591', N'2016-04-04', 0, 2),
    (N'460439', N'2016-03-25', 2, 3),
    (N'905492', N'2015-02-13', 4, 0),
    (N'454128', N'2015-09-20', 2, 1),
    (N'245743', N'2015-04-17', 2, 0),
    (N'127239', N'2015-09-24', 3, 3),
    (N'747765', N'2015-10-16', 5, 0),
    (N'141601', N'2015-03-31', 2, 1),
    (N'427192', N'2015-03-01', 3, 3),
    (N'779537', N'2015-04-25', 3, 0),
    (N'614487', N'2015-12-04', 8, 3),
    (N'771285', N'2015-12-24', 7, 3),
    (N'868108', N'2016-01-21', 5, 3),
    (N'586986', N'2015-11-07', 1, 3),
    (N'957210', N'2015-01-28', 0, 3),
    (N'925265', N'2016-02-09', 6, 2),
    (N'329580', N'2015-05-07', 4, 0),
    (N'229746', N'2015-08-02', 1, 2),
    (N'398802', N'2015-11-18', 3, 1),
    (N'793846', N'2016-04-04', 7, 3),
    (N'194543', N'2015-01-16', 0, 2),
    (N'699892', N'2016-03-06', 5, 2),
    (N'849262', N'2015-11-20', 5, 0),
    (N'212969', N'2016-02-23', 1, 2),
    (N'913224', N'2015-08-17', 6, 3),
    (N'283784', N'2015-01-23', 1, 3),
    (N'964445', N'2015-03-07', 1, 1),
    (N'219254', N'2015-06-11', 7, 2),
    (N'136235', N'2015-03-21', 4, 3),
    (N'371430', N'2015-03-19', 2, 2),
    (N'219597', N'2015-12-12', 3, 3),
    (N'721655', N'2016-04-29', 5, 2),
    (N'434154', N'2016-02-25', 8, 0),
    (N'290254', N'2015-11-02', 9, 2),
    (N'736586', N'2015-05-30', 4, 2),
    (N'622526', N'2015-11-08', 0, 1),
    (N'693936', N'2016-03-21', 1, 0),
    (N'529728', N'2015-02-25', 1, 2),
    (N'963244', N'2015-11-22', 9, 0),
    (N'261164', N'2015-06-26', 9, 2),
    (N'986536', N'2016-01-07', 6, 1),
    (N'572741', N'2015-12-01', 6, 1),
    (N'125921', N'2015-08-03', 2, 2),
    (N'262858', N'2015-12-07', 3, 0),
    (N'879489', N'2015-09-02', 7, 1),
    (N'105797', N'2015-12-26', 6, 1),
    (N'806498', N'2015-07-26', 8, 3),
    (N'960686', N'2016-04-07', 2, 2),
    (N'201332', N'2015-09-19', 4, 0),
    (N'405572', N'2015-11-04', 3, 0),
    (N'204617', N'2015-09-05', 5, 1),
    (N'767548', N'2016-02-09', 7, 2),
    (N'363492', N'2015-12-18', 6, 1),
    (N'541884', N'2015-07-07', 10, 1);
COMMIT TRANSACTION CreateTables