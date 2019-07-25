using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.DATA
{
    public class ApplicationDbContext :  IdentityDbContext<IdentityUser>
    {
        public DbSet<Symbol> Symbols { get; set; }
        public DbSet<Watchlist> Watchlists { get; set; }
        

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Symbol>(entity =>
            {
                entity.ToTable("Symbols");
                entity.HasKey(x => x.Id);
                entity
                .Ignore(x => x.DateCreated)
                .Ignore(x => x.CreatedById);
                entity.Property(s => s.Currency).IsRequired();
                entity.Property(s => s.Description).IsRequired();
                entity.Property(s => s.Name).IsRequired();
                entity.Property(s => s.StockExchangeLong).IsRequired();    
            });


            builder.Entity<Watchlist>(entity =>
            { 
                entity.ToTable("Watchlists");
                entity.HasKey(x => new { x.UserId, x.SymbolId });

                entity
                .HasOne(x => x.User)
                .WithMany(x=>x.Watchlists)
                .HasForeignKey(x => x.UserId)
                .HasPrincipalKey(x => x.Id);

                entity
                .HasOne(x => x.Symbol)
                .WithMany(x => x.Watchlists)
                .HasForeignKey(x => x.SymbolId)
                .HasPrincipalKey(x => x.Id);
            });
            base.OnModelCreating(builder);
        }

    }
}
