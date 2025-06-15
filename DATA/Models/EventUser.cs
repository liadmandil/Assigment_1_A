using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DATA.Models;

public partial class EventUser
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  // ✅ אומר ל-EF לא לשלוח Id
    public int Id { get; set; }

    public int EventRef { get; set; }

    public int UserRef { get; set; }

    public DateTime Creation { get; set; } = DateTime.Now;

    public virtual Event EventRefNavigation { get; set; } = null!;

    public virtual User UserRefNavigation { get; set; } = null!;
}
