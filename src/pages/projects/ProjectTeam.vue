<template>
    <div>
        {{teams}}
        <div class="team-members">
            <CRow v-for="(team, i) in teams" :key="i">
                <CCol sm="6">
                    <validation-provider name="Role" rules="required" v-slot="validationContext">
                        <select 
                            :invalid="validationContext.errors[0]"
                            :class="{ 'is-invalid': validationContext.errors[0] }"
                            v-model="team.role" id="uid-mu3370ovqhi" vertical="" class="form-control form-control-lg">
                            <option value="" selected="selected"> Select Role </option> 
                            <option :key="role.id" :value="role.id" v-for="role in roles" >{{role.name}} </option>
                        </select>
                        <br>
                        <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                    </validation-provider>
                </CCol> 
                <CCol sm="6">
                    <validation-provider name="Employee" rules="required" v-slot="validationContext">
                        <select 
                            :invalid="validationContext.errors[0]"
                            :class="{ 'is-invalid': validationContext.errors[0] }"
                            v-model="team.employee" id="uid-mu3370ovqhi" vertical="" class="form-control form-control-lg">
                            <option value="" selected="selected"> Select Employee </option> 
                            <option :key="employee.id" :value="employee.id" v-for="employee in employees" >{{employee.name}} </option>
                        </select>
                        <br>
                        <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                    </validation-provider>
                </CCol> 
            </CRow>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectTeam',

    props: {
        teams: {
            type: Array,
            require: true
        }
    },

    data() {
        return {
            item: {},
        }
    },
}
</script>