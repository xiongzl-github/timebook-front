<template>
    <div style="width:1000px;height:800px;">
        <FullCalendar
            ref="fc"
            className='demo-app-main'
            :options='calendarOptions'>
            <template v-slot:eventContent='arg'>
                <b>{{ arg.timeText }}</b>
                <i>{{ arg.event.title }}</i>
            </template>
        </FullCalendar>
        <!-- <div id='calendar'></div> -->
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';
// import { Calendar } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
// import 'fullcalendar/main.css';
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

export default {
    name: "CCalendar",
    components: {
        vuescroll,
        FullCalendar
    },
    computed: {
        ...mapGetters(["timeline", "timelineCategory"])
    },
    created() {
        console.log("CCalendar created====================================");
    },
    mounted: function() {
        console.log("CCalendar mounted====================================");
        // this.$forceUpdate();
        // FullCalendar.render();
        console.log("ashfdlsasladfjsaldfjsladfjlaskdfjlksdfjlasjdflsdfjlaksjfdlsdjflksajdflksjdf");
        // this.handleEvents(null);
        console.log(FullCalendar);
        console.log(this.FullCalendar);
        // this.$refs.FullCalendar.changeView('timeGridDay');
        console.log(this.$refs.fc);
        // this.$refs.fc.options.initialView('timeGridDay');
        // console.log(this.$refs.FullCalendar);
    },
    data() {
        return {
            calendarOptions: {
                plugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin // needed for dateClick
                ],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                initialView: 'timeGridDay',
                initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
                // select: this.handleDateSelect,
                eventClick: this.handleEventClick,
                eventsSet: this.handleEvents,
                // changeView
                
            },
            currentEvents: []
        }
    },
    methods: {
        handleDateSelect(selectInfo) {
            console.log("handleDateSelect: ");
            console.log(selectInfo);
            // let title = prompt('Please enter a new title for your event')
            // let calendarApi = selectInfo.view.calendar
            // calendarApi.unselect() // clear date selection
            // if (title) {
            //     calendarApi.addEvent({
            //         id: createEventId(),
            //         title,
            //         start: selectInfo.startStr,
            //         end: selectInfo.endStr,
            //         allDay: selectInfo.allDay
            //     })
            // }
        },
        handleEventClick(clickInfo) {
            console.log("handleEventClick");
            console.log(clickInfo);
            // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            //     clickInfo.event.remove()
            // }
        },
        handleEvents(events) {
            console.log("handleEvents");
            console.log(events);
            this.currentEvents = events
        },
        test(param01, param02){
            console.log("test");
        },
    }
};
</script>
<style  scoped>
/* div.fc.fc-media-screen.fc-direction-ltr.fc-theme-standard{
    height: 800px;
} */
.fc { /* the calendar root */
  max-width: 1000px;
  margin: 0 auto;
  height: 800px;
}


</style>
