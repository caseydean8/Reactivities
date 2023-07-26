using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<IActionResult> GetActivities()
        {
            // return await _context.Activities.ToListAsync();
            // return await _mediator.Send(new List.Query());
            // Mediator is inherited from BaseApiController
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] // api/activities/id
        // IActionResult allows us to return an http response
        public async Task<IActionResult> GetActivity(Guid id)
        {
            // object initializer syntax { Id = id } 
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        // End point for creating an activity
        [HttpPost]
        // IActionResult gives us access to the http response types such as return OK, return bad request, return not found
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        // End point for updating an activity
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        // End point for deleting an activity
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            // Again use object initializer syntax when we instantiate this particular class
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
