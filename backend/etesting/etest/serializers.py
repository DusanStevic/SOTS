from rest_framework import serializers
from etest.models import *
from accounts.serializers import *
import getpass


class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = '__all__' 

class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = '__all__'


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = '__all__'
class KnowledgeSpaceSerializer(serializers.ModelSerializer):
    nodes = NodeSerializer(many=True)
    links = LinkSerializer(many=True)
    class Meta:
        model = KnowledgeSpace
        fields = '__all__'
class CreateKnowledgeSpaceSerializer(serializers.ModelSerializer):
    nodes = NodeSerializer(many=True)
    links = LinkSerializer(many=True)
    def create(self, validated_data):
        nodes = validated_data.pop('nodes')
        links = validated_data.pop('links')
        knowledge_space = KnowledgeSpace.objects.create(**validated_data)
        print(nodes)
        print(links)
        for node in nodes:
            serializer = NodeSerializer(data=node)
            serializer.is_valid(raise_exception=True)
            knowledge_space.nodes.add(serializer.save())
        for link in links:
            serializer = LinkSerializer(data=link)
            serializer.is_valid(raise_exception=True)
            knowledge_space.links.add(serializer.save())
        return knowledge_space
    class Meta:
        model = KnowledgeSpace
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    class Meta:
        model = Question
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    domain = DomainSerializer(many=False)
    teachers = UserSerializer(many=True)
    class Meta:
        model = Course
        fields = '__all__'

class TestSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    creator = UserSerializer(many=False)
    course = CourseSerializer(many=False)
    class Meta:
        model = Test
        fields = '__all__'

class CompletedTestSerializer(serializers.ModelSerializer):
    student = UserSerializer(many=False)
    test = TestSerializer(many=False)
    class Meta:
        model = CompletedTest
        fields = '__all__'

class ChosenAnswerSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        student = User.objects.get(id=self.context['request'].user.id)
        test_id = Question.objects.filter(answers=validated_data['answer']).values_list('test_id', flat=True)
        test = Test.objects.get(id=test_id[0])
        completedTest = CompletedTest.objects.filter(test_id=test_id[0]).filter(student_id=student.id)
        if(completedTest.exists()):
            if (validated_data['answer'].correct_answer) == True:
                score = completedTest[0].score
                completedTest.update(score= score +1)
        else:
            if (validated_data['answer'].correct_answer) == True:
                completedTest = CompletedTest.objects.create(score=1, test=test, student=student)
            else:
                completedTest = CompletedTest.objects.create(score=0, test=test, student=student)
        chosenAnswer = ChosenAnswer.objects.create(answer_id=validated_data['answer'].id, completed_test=completedTest[0])
        
        question = self.QuestionBasedOnAnswers(validated_data['answer'])
        
        return chosenAnswer

    def QuestionBasedOnAnswers(self,answer):
        print(answer)

    class Meta:
        model = ChosenAnswer
        fields = ['answer']
 