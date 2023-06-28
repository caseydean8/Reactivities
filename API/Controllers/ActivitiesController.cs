using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        // Not going to be injecting DataContext (below) inside this class, it has been moved to Application.Activites.List and using MediatR instead
        // private readonly DataContext _context;
        // public ActivitiesController(DataContext context)
        // {
        //     _context = context;
        // }
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet] // api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            // return await _context.Activities.ToListAsync();
            return await _mediator.Send(new List.Query());
        }
        [HttpGet("{id}")] // api/activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            // return await _context.Activities.FindAsync(id);
            return Ok();
        }
    }
}