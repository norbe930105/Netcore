using API.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        //Permite hacer peticiones desde otros dominios a la webApi
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<AplicationDBContext>();
            services.AddControllers();
            //services.AddMvc().AddJsonOptions(ConfigureJson);
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                 builder =>
                 {
                     builder.AllowAnyOrigin()
                     .AllowAnyMethod()
                     // .AllowCredentials()
                     .AllowAnyHeader();
                 });
            });
        }

        //private void ConfigureJson(JsonOptions obj)
        //{
        //    obj.JsonSerializerOptions.MaxDepth = 512;
        //}

        //private void ConfigureJson(MvcOptions obj)
        //{
        //    obj.
        //}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
