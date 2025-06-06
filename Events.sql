CREATE DATABASE Events;
GO
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Events].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Events] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Events] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Events] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Events] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Events] SET ARITHABORT OFF 
GO
ALTER DATABASE [Events] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Events] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Events] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Events] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Events] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Events] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Events] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Events] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Events] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Events] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Events] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Events] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Events] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Events] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Events] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Events] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Events] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Events] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Events] SET  MULTI_USER 
GO
ALTER DATABASE [Events] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Events] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Events] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Events] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Events] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Events] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Events] SET QUERY_STORE = OFF
GO
USE [Events]
GO
/****** Object:  Table [dbo].[Events]    Script Date: 6/3/2025 5:20:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Events](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[MaxRegistrations] [int] NOT NULL,
	[Location] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventUser]    Script Date: 6/3/2025 5:20:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventUser](
	[EventRef] [int] NOT NULL,
	[UserRef] [int] NOT NULL,
	[Creation] [datetime] NOT NULL,
 CONSTRAINT [PK_EventUser] PRIMARY KEY CLUSTERED 
(
	[EventRef] ASC,
	[UserRef] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 6/3/2025 5:20:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[EventUser] ADD  DEFAULT (getdate()) FOR [Creation]
GO
ALTER TABLE [dbo].[EventUser]  WITH CHECK ADD  CONSTRAINT [FK_EventUser_Events] FOREIGN KEY([EventRef])
REFERENCES [dbo].[Events] ([ID])
GO
ALTER TABLE [dbo].[EventUser] CHECK CONSTRAINT [FK_EventUser_Events]
GO
ALTER TABLE [dbo].[EventUser]  WITH CHECK ADD  CONSTRAINT [FK_EventUser_Users] FOREIGN KEY([UserRef])
REFERENCES [dbo].[Users] ([ID])
GO
ALTER TABLE [dbo].[EventUser] CHECK CONSTRAINT [FK_EventUser_Users]
GO
USE [master]
GO
ALTER DATABASE [Events] SET  READ_WRITE 
GO
