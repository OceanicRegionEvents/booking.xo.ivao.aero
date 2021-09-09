<?php

namespace App\Http\Controllers;


use App\Models\Event;
use App\Models\Scenery;
use Illuminate\Http\Request;

class SceneryController extends Controller
{
    public function create(Request $request, String $eventId)
    {
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'license' => 'required|string',
            'link' => 'required|string',
            'simulator' => 'required|string'
        ]);

        $this->authorize('create', Scenery::class);

        $event = Event::find($eventId);

        if (!$event) {
            abort(404, 'Event not founded');
        }

        $scenery = new Scenery($request->all());

        $event->sceneries()->save($scenery);
    }

    public function get(String $eventId)
    {
        return Scenery::where('eventId', $eventId)->get();
    }

    public function delete(String $sceneryId)
    {
        Scenery
            ::where('id', $sceneryId)
            ->delete();
    }
}
