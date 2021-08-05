require 'rails_helper'

RSpec.describe "ReminderServices" do
  describe '日付計算' do
    context 'daily_next_time' do
      it 'まだその時刻を過ぎていない場合はその日のその時刻を返す' do
        now = Time.current.change(hour: 0, min: 1)
        after_now_today = now.since(Random.rand(1..1438).minutes)
        result = ReminderService.daily_next_time(after_now_today.strftime('%H:%M'), now)
        expect(result).to eq after_now_today.strftime('%Y-%m-%d %H:%M')
      end

      it 'もうその時刻を過ぎている場合は次の日のその時刻を返す' do
        now = Time.current.change(hour: 23, min: 59)
        before_now_today = now.ago(Random.rand(1..1438).minutes)
        result = ReminderService.daily_next_time(before_now_today.strftime('%H:%M'), now)
        expect(result).to eq before_now_today.since(1.days).strftime('%Y-%m-%d %H:%M')
      end
    end

    context 'weekly_next_time' do
      it '該当曜日で指定時刻を過ぎていない場合はその日のその時刻を返す' do
        now = Time.current.change(hour: 0, min: 1)
        after_now_today = now.since(Random.rand(1..1438).minutes)
        result = ReminderService.weekly_next_time(after_now_today.strftime('%H:%M'), [now.wday], now)
        expect(result).to eq after_now_today.strftime('%Y-%m-%d %H:%M')
      end

      it '該当曜日で指定時刻を過ぎてる、かつ、他の曜日指定なしの場合は1週間後のその時刻を返す' do
        now = Time.current.change(hour: 23, min: 59)
        before_now_today = now.ago(Random.rand(1..1438).minutes)
        result = ReminderService.weekly_next_time(before_now_today.strftime('%H:%M'), [now.wday], now)
        expect(result).to eq before_now_today.since(1.weeks).strftime('%Y-%m-%d %H:%M')
      end

      it '該当曜日ではない、かつ、指定曜日が今週にある場合はその日の指定時刻を返す' do
        now = Time.current.next_week(:wednesday)
        result = ReminderService.weekly_next_time(now.strftime('%H:%M'), [0, 1, 2, 5], now)
        expect(result).to eq now.since(2.days).strftime('%Y-%m-%d %H:%M') # 2.days: 5(fri)-3(wed)
      end

      it '該当曜日ではない、かつ、指定曜日が来週にある場合はその日の指定時刻を返す' do
        now = Time.current.next_week(:friday)
        result = ReminderService.weekly_next_time(now.strftime('%H:%M'), [1, 3, 4], now)
        expect(result).to eq now.since(3.days).strftime('%Y-%m-%d %H:%M') # 3.days: 1(mon)+7-5(fri)
      end
    end
  end
end
