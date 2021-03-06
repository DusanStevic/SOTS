from rest_framework import serializers
from etest.models import *
from accounts.serializers import *

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
    domain = DomainSerializer(many=False)
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

class ChosenAnswerSerializer(serializers.ModelSerializer):
    answer = AnswerSerializer(many=False)
    class Meta:
        model = ChosenAnswer
        fields = '__all__'

class CompletedTestSerializer(serializers.ModelSerializer):
    student = UserSerializer(many=False)
    test = TestSerializer(many=False)
    completed_test_chosen_answers = ChosenAnswerSerializer(many=True)
    class Meta:
        model = CompletedTest
        fields = '__all__'

class UncompletedAnswerSerializer(serializers.ModelSerializer):
    # Adding a non model field to a Serializer.
    chosen = serializers.SerializerMethodField()
    class Meta:
        model = Answer
        # Excluding correct answer from the response. 
        # Preventing correct answer exposure in the browser console.
        fields = ['id', 'answer_text', 'question', 'chosen']

    def get_chosen(self, obj):
        return False

class UncompletedQuestionSerializer(serializers.ModelSerializer):
    answers = UncompletedAnswerSerializer(many=True)
    class Meta:
        model = Question
        fields = '__all__'

class UncompletedTestSerializer(serializers.ModelSerializer):
    questions = UncompletedQuestionSerializer(many=True)
    creator = UserSerializer(many=False)
    course = CourseSerializer(many=False)
    class Meta:
        model = Test
        fields = '__all__'

class CreateCompletedTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedTest
        fields = '__all__'


class CreateTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'
