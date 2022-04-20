<template>
    <CTabs>
        <div v-for="(makeup, index) in makeup_plans" :key="makeup.id">
        <CTab :title="makeup.name" style="min-width: 75px">
            <div class="my-3"> 
            <CListGroupItem class="mb-0" 
                v-for="(list, index) in makeup.field_list" :key="list.id"
                @click="list_accord = index" >
                <div 
                class="rounded-md bg-white my-1 c">
                <h5 class="m-0" v-text="list.name"></h5>
                </div>
                <CCollapse :show="index === list_accord">
                <CCardBody>
                    <!-- {{list}} {{answerNow}} -->
                    <div v-for="(question, index) in list.checklist_questions" :key="index">
                        <CListGroupItem @click="loadAnswer(list, index)"
                            class="px-0 hover-shadow-sm bg-light mb-2 border-none" style="height: 36px">
                            <div class="row mx-0 pb-2 ">
                            <div class="col-5">
                                <p class="text-sm truncate">{{question.name}} </p>
                            </div>
                            <div class="col-6">
                                <p class="text-sm truncate"> {{question.answers}}</p>
                            </div>
                            <div class="col-1">
                                <v-icon name="trash" class="mr-4"></v-icon>
                            </div>
                            </div>
                        </CListGroupItem>
                    </div>
                </CCardBody>
                </CCollapse>
            </CListGroupItem>
            </div>
        </CTab> 
        </div>
    </CTabs>
</template>

<script>
export default {
    name: 'MakeupPlan',

    props: {
        makeup_plans: {
            type: Object,
            require: true
        }
    },

    method: {
        
        loadAnswer(item, index){
            this.answerNow = !this.answerNow
            this.item = {
                question: item.checklist_questions[index],
                answer: item.answers[index]
            };
            console.log(this.item);
        },
    }
}
</script>
