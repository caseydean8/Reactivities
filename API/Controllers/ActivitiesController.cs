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

        // constructor moved to BaseApiController
        // private readonly IMediator _mediator;
        // public ActivitiesController(IMediator mediator)
        // {
        //     _mediator = mediator;
        // }

        [HttpGet] // api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            // return await _context.Activities.ToListAsync();
            // return await _mediator.Send(new List.Query());
            // Mediator is inherited from BaseApiController
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // api/activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            // object initializer syntax { Id = id } 
            return await Mediator.Send(new Details.Query { Id = id });
        }

        // End point for creating an activity
        [HttpPost]
        // IActionResult gives us access to the http response types such as return OK, return bad request, return not found
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        // End point for updating an activity
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }
    }
}