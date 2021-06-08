<template>
<div style="width: 1000px; height: 800px">
    <Table height=800 width=1000 style="display:inline-block" :span-method="handleSpan"  row-key="id" :columns="columns16" :data="data12" border>
        <template slot-scope="{ row, index }" slot="days">
            <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
            <Button type="error" size="small" @click="remove(index)">Delete</Button> -->
            <Progress :percent="25" />
            <Progress :percent="45" status="active" />
        </template>
    </Table>
</div>
</template>

<script>

export default {
  name: "CGant",
  data() {
    return {
        columns16: [
            {
                title: 'Taskname',
                key: 'taskname',
                width: 200,
                fixed: 'left',
                tree: true
            },
            {
                title: 'Assigned',
                width: 100,
                // fixed: 'left',
                key: 'assigned'
            },
            {
                title: 'StartTime',
                width: 120,
                // fixed: 'left',
                key: 'startTime'
            },
            {
                title: 'EndTime',
                width: 120,
                // fixed: 'left',
                key: 'endTime'
            },
            {
                title: 'Progress',
                width: 100,
                // fixed: 'left',
                key: 'progress'
            },
            {
            title: 'Days',
            align: 'center',
            children: [
                {
                    title: '1',
                    key: '1',
                    align: 'center',
                    width: 50,
                    slot: 'days',
                },
                {
                    title: '2',
                    key: '2',
                    align: 'center',
                    width: 50
                },
                {
                    title: '3',
                    key: '3',
                    align: 'center',
                    width: 50
                },
                {
                    title: '4',
                    key: '4',
                    align: 'center',
                    width: 50
                },
                {
                    title: '5',
                    key: '5',
                    align: 'center',
                    width: 50
                },
                {
                    title: '6',
                    key: '6',
                    align: 'center',
                    width: 50
                },
                {
                    title: '7',
                    key: '7',
                    align: 'center',
                    width: 50
                },
                {
                    title: '8',
                    key: '8',
                    align: 'center',
                    width: 50
                },
                {
                    title: '9',
                    key: '9',
                    align: 'center',
                    width: 50
                },
                {
                    title: '10',
                    key: '10',
                    align: 'center',
                    width: 60
                },
            ]}
            ],
        data12: [
            {
                id: '100',
                taskname: 'John Brown',
                assigned: 'xiongzl',
                startTime: '2021-05-01',
                endTime: '2021-08-01',
                progress: 100,
            },
            {
                id: '101',
                taskname: 'Jim Green',
                assigned: 'xiongzl',
                startTime: '2021-05-01',
                endTime: '2021-08-01',
                progress: 100,
                _showChildren: true,
                children: [
                    {
                        id: '10100',
                        taskname: 'John Brown',
                        assigned: 'xiongzl',
                        startTime: '2021-05-01',
                        endTime: '2021-08-01',
                        progress: 100
                    },
                    {
                        id: '10101',
                        taskname: 'Joe Blackn',
                        assigned: 'xiongzl',
                        startTime: '2021-05-01',
                        endTime: '2021-08-01',
                        progress: 100
                    },
                    {
                        id: '10102',
                        taskname: 'Jon Snow',
                        assigned: 'xiongzl',
                        startTime: '2021-05-01',
                        endTime: '2021-08-01',
                        progress: 100,
                        _showChildren: true,
                        children: [
                            {
                                id: '1010200',
                                taskname: 'Jim Green',
                                assigned: 'xiongzl',
                                startTime: '2021-05-01',
                                endTime: '2021-08-01',
                                progress: 100
                            }
                        ]
                    }
                ]
            },
            {
                id: '102',
                taskname: 'Joe Black',
                assigned: 'xiongzl',
                startTime: '2021-05-01',
                endTime: '2021-08-01',
                progress: 100
            },
            {
                id: '103',
                taskname: 'Jon Snow',
                assigned: 'xiongzl',
                startTime: '2021-05-01',
                endTime: '2021-08-01',
                progress: 100
            }
        ]
    };
  },
  methods: {
      handleSpan ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 5) {
            return [1, 10];
        } 
    }
  },
  components: {
  },
};
</script>

<style lang="less">
</style>
